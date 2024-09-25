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

exports.getAllEvents = async (req, res) => {
    try {
        const events = await clanModel.getAllEvents()
        return res.status(200).json(events)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Server error getting events: ${err.message}`});
    }
};

exports.getEventDetails = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId)
        if (!eventId || isNaN(eventId)){
            return res.status(404).json({ message: `eventId is invalid: ${eventId}`});
        }
        const eventDetails = await clanModel.getEventDetails({eventId})
        return res.json(eventDetails)
    } catch (err) {
        console.err(err)
        res.status(500).json({ error: `Server error getting event: ${err.message}`})
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const { clanName } = req.params;
        const eventId = parseInt(req.params.eventId)
        // Fetch clan by name
        const clan = await clanModel.getClanByName(clanName);
        if (!clan || !eventId) {
            return res.status(404).json({ message: "Cannot create event for non-existent clan or event" });
        }
        const clanId = clan[0].clan_id;
        const deleteEvent = await clanModel.deleteEvent({clan_id: clanId, event_id: eventId})
        res.json({deleteEvent})
    } catch (err) {
        console.err(err)
        res.status(500).json({ error: `Server error getting event: ${err.message}`})
    }
}

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
        const id = parseInt(req.params.id);
        const updatedFields = req.body;
        const rowCount = await clanModel.updateClan(id, updatedFields);

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
