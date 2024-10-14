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

exports.getBulletinBoardPost = async (req, res) => {
    try{
        const { clanName } = req.params;
        const post_id = parseInt(req.params.postId);
        const clan = await clanModel.getClanByName(clanName);
        
        if (clanName === 0 || post_id.length === 0) {
            return res.status(404).json({ message: `Clan OR Post not found: ${post_id}, ${clanName}` });
        }

        const clan_id = clan[0].clan_id;
        const bulletinPost = await clanModel.getBulletinBoardPost(post_id, clan_id)
        res.status(200).json({bulletinPost})

    } catch (err){
        console.error(err);
        res.status(500).json({error: `server error: ${err}`})
    }
};

exports.getEventComments = async (req, res) => {
    try{
        const { clanName } = req.params;
        const eventId = parseInt(req.params.eventId)
        const clan = await clanModel.getClanByName(clanName);
        if (clan.length === 0) {
            return res.status(404).json({ message: "Cannot create event for non-existent clan" });
        }
        const clanId = clan[0].clan_id;
        const eventComments = await clanModel.getEventsComments({clan_id: clanId, event_id: eventId})

        res.status(201).json({eventComments})


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

exports.deleteBulletin = async (req, res) => {
    try{
        
        const { clanName } = req.params;
        const post_id = parseInt(req.params.postId);
        console.log(`clanName: ${clanName}, post_id: ${post_id}`)
        const clan = await clanModel.getClanByName(clanName);
        
        if (!clanName || !post_id) {
            return res.status(404).json({ message: `Clan OR Post not found: ${post_id}, ${clanName}` });
        }

        const clan_id = clan[0].clan_id;
        const deleteBulletin = await clanModel.deleteBulletin(clan_id, post_id)
        res.status(200).json({deleteBulletin})

    } catch (err){
        console.error(err);
        res.status(500).json({error: `server error: ${err}`})
    }
};

exports.deleteBulletin = async (req, res) => {
    try{
        
        const { clanName } = req.params;
        const post_id = parseInt(req.params.postId);
        console.log(`clanName: ${clanName}, post_id: ${post_id}`)
        const clan = await clanModel.getClanByName(clanName);
        
        if (!clanName || !post_id) {
            return res.status(404).json({ message: `Clan OR Post not found: ${post_id}, ${clanName}` });
        }

        const clan_id = clan[0].clan_id;
        const deleteBulletin = await clanModel.deleteBulletin(clan_id, post_id)
        res.status(200).json({deleteBulletin})

    } catch (err){
        console.error(err);
        res.status(500).json({error: `server error: ${err}`})
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


exports.updateEvent = async (req, res) => {
    try {
        const { clanName } = req.params;
        const eventId = parseInt(req.params.eventId);
        // Fetch clan by name
        const clan = await clanModel.getClanByName(clanName);
        if (clan.length === 0 || !eventId || isNaN(eventId)) {
            return res.status(404).json({ message: "Cannot create event for non-existent clan or missing eventId" });
        }
        const clanId = clan[0].clan_id;
        const updatedFields = req.body
        
        const updateEvent = await clanModel.updateEvent({
            clan_id: clanId,
            event_id: eventId,
            updatedFields: updatedFields
        })
        if (updateEvent.length === 0){
            return res.status(404).json({ error: "Event not found "});
        }
        return res.status(202).json({ message: `Updated event successfully: `, updatedEvent: updateEvent});

    } catch (err) {
        console.error(err);
        if (err.message === "No valid fields provided for update") {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Server error" });
        }
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


