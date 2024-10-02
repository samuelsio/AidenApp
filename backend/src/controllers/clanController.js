const e = require("express");
const clanModel = require("../models/clanModel");

exports.getClans = async (req, res) => {
    try {
        const clans = await clanModel.getAllClans();
        res.json(clans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error clan-controller" });
    }
};

exports.getIndividualComment= async (req, res) => {
    try{
        const { clanName } = req.params;
        const clan = await clanModel.getClanByName(clanName);
        const eventId = parseInt(req.params.eventId);
        const commentId = parseInt(req.params.commentId);
        if (clan.length === 0) {
            return res.status(404).json({ message: `Error handling data: event: ${eventId}, comment: ${commentId}, clan: ${clanId}` });
        }

        const clanId = clan[0].clan_id;

        const comment = await clanModel.getIndividualComment({event_id: eventId, comment_id: commentId})
        res.json({comment})
    } catch (err){
        console.error(err);
        res.status(500).json({error: `server error`});
    }
};

exports.patchIndividualComment = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const commentId = parseInt(req.params.commentId);

        if (!eventId || !commentId){
            return res.status(404).json({ message: `missing fields for comment: event:${eventId}, comment: ${commentId}`});
        }
        const updatedFields = req.body;
        const patchComment = await clanModel.patchIndividualComment({event_id: eventId, comment_id: commentId, updatedFields: updatedFields});

        res.status(201).json({message: `Patched clan `, patchComment: patchComment})

    } catch (err) {
        console.error(err);
        if (err.message === "No valid fields provided for update") {
            res.status(400).json({ error: err.message });
        } if (err.message == "Clan has not been edited or found") { 
            res.status(404).json({error: err.message})
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
};

exports.getBulletinBoard = async (req, res) => {
    try{
        const { clanName } = req.params;
        const clan = await clanModel.getClanByName(clanName);
        
        if (clan.length === 0) {
            return res.status(404).json({ message: "Clan not found" });
        }
        const bulletinBoard = await clanModel.getBulletinBoard(clan[0].clan_id);

        res.json({bulletinBoard});
    } catch (err){
        console.error(err);
        res.status(500).json({error: `server error`});
    }
};

exports.createBulletinComment = async (req, res) => {
    try{
        const { clanName } = req.params;
        const clan = await clanModel.getClanByName(clanName);
        if (clan.length === 0) {
            return res.status(404).json({ message: "Cannot create event for non-existent clan" });
        }
        const clanId = clan[0].clan_id;
        const bulletinComment = await clanModel.createBulletinComment(
            {...req.body,
            clan_id: clanId})
        res.json({bulletinComment})
        } catch (err){
            console.error(err);
            res.status(500).json({error: `server error`});
        }
};

exports.getClanDetails = async (req, res) => {
    try {
        const { clanName } = req.params;

        const clan = await clanModel.getClanByName(clanName);
        
        if (clan.length === 0) {
            return res.status(404).json({ message: "Clan not found" });
        }

        // Fetch bulletin board and events for this clan
        const bulletinBoard = await clanModel.getBulletinBoard(clan[0].clan_id);
        const events = await clanModel.getEventsByClan(clan[0].clan_id);

        res.json({
            clan: clan[0],
            bulletinBoard,
            events,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Server error getClanDetails: ${err.message}` });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { clanName } = req.params;

        // Fetch clan by name
        const clan = await clanModel.getClanByName(clanName);
        if (clan.length === 0) {
            return res.status(404).json({ message: "Cannot create event for non-existent clan" });
        }
        const clanId = clan[0].clan_id;
        const newEvent = await clanModel.createEvent({
            ...req.body,  
            clan_id: clanId
        });

        return res.status(201).json({ message: "Event created successfully", event: newEvent });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.createEventComment = async (req, res) => {
    try {
        const { eventId } = req.params;
        const comment = await clanModel.createEventComment({...req.body, event_id: eventId})
        return res.status(201).json({message: "Comment created succesfully", comment_id: comment})
    } catch (error) {
        return res.status(500).json({mesage: "Server error", error: error.message});
    }
};

exports.createClan = async (req, res) => {
    try {
        const clan = await clanModel.createClan(req.body);
        res.status(201).json({
            message: `Clan added with ID: ${clan.clan_id}`,
            clan_id: clan.clan_id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateClan = async (req, res) => {
    try {
        const  clan_id  = parseInt(req.params.clanId);
        if (isNaN(clan_id)) {
            return res.status(400).json({ error: `Invalid clan ID: ${clan_id}` });  // Handle invalid clanId
        }
        const updatedFields = req.body;
        const rowCount = await clanModel.updateClan({
            clanId: clan_id, 
            updatedFields: updatedFields
        });

        if (rowCount === 0) {
            return res.status(404).json({ error: "Clan not found" });
        }

        res.json({ message: "Clan updated successfully" });
    } catch (err) {
        console.error(err);
        if (err.message === "No valid fields provided for update") {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
};

exports.deleteClan = async (req, res) => {
    try {
        const clanId = parseInt(req.params.clanId);
        if (isNaN(clanId)) {
            return res.status(400).json({ error: `Server error: clanId not a number: ${clanId}` });
        }

        const deletedClan = await clanModel.deleteClan({ clan_id: clanId });

        if (deletedClan.length === 0) {
            return res.status(404).json({ error: `Clan with id ${clanId} not found.` });
        }

        return res.status(202).json({
            message: `Clan successfully deleted: ${deletedClan[0].clan_id}`,
            clan_id: deletedClan[0].clan_id,
        });
    } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` });
    }
};



exports.deleteIndividualComment = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const commentId = parseInt(req.params.commentId);

        if (!eventId || !commentId) {
            return res.status(400).json({ error: `missing fields: event: ${eventId}, comment: ${commentId}`})
        }

        const deletedComment = await clanModel.deleteIndividualComment({event_id: eventId, comment_id: commentId})
        return res.status(202).json({
            message: `Comment deleted: `,
            comment: deletedComment
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Server error: ${err}`})
    }
}