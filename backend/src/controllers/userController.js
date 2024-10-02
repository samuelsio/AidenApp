const userModel = require("../models/userModel");

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getAllMemberships = async (req, res) => {
    try {
        const memberships = await userModel.getAllMemberships();
        res.status(200).json(memberships)
    } catch (err){
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getMembershipDetail = async (req, res) => {
    try {
        const clanId = parseInt(req.params.clanId)
        const userId = parseInt(req.params.userId)

        if (!userId && !clanId){
            res.status(404).json({error: `No clanId and No userId`})
        }

        if (!userId){
            const membershipFromClan = await userModel.getMembershipDetail({clan_id: clanId})
            res.status(200).json({membershipFromClan})
        }

        if (!clanId){
            const membershipFromUser = await userModel.getMembershipDetail({user_id: userId})
            res.status(200).json({membershipFromUser})
        }
    } catch (err){
        console.error(`Error getting MembershipDetail: ${err}`)
        throw err;
    }
}

exports.getMembershipDetailedView = async (req, res) => {
    try { 
        const userId = parseInt(req.params.userId);
        const clanId = parseInt(req.params.clanId);

        if (!userId || !clanId){
            return res.status(404).json({ message: `missing fields userId: ${userId}, clanId: ${clanId}`})

        }
        const memberships = await userModel.getMembershipDetailedView({clan_id: clanId, user_id: userId})
        res.status(200).json({memberships})
    } catch (err){
        console.error(err)
        res.status(500).json({ error: `Server error: ${err.message}`})
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.getUserDetails(userId);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });  // Handle if user is not found
        }

        res.json(user[0])
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
}

exports.createMembership = async (req, res) => {
    try { 
        const membership = await userModel.createMembership(req.body);
        res.status(201).json({
            message: `Member added with ID: ${membership.membership_id}`,
            membership: membership
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: `Server error: ${err.message}`})
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await userModel.createUser(req.body);
        res.status(201).json({
            message: `User added with ID: ${user.user_id}`,
            user_id: user.user_id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateMembership = async (req, res) => {
    try {
        const membershipId = parseInt(req.params.membershipId)
        if (isNaN(membershipId)){
            return res.status(400).json({ error: `Invalid membership ID: ${membershipId}` });  // Handle invalid userId
        }

        const updatedFields = req.body;
        const updatedMembership = await userModel.updateMembership({
            membership_id: membershipId, 
            updatedFields: updatedFields
        });
        if (updatedMembership === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(201).json({message: `User updated successfully`, updatedMembership: updatedMembership});

    } catch (err) {
        console.error(err);
        if (err.message === "No valid fields provided for update") {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
};

exports.updateUser = async (req, res) => {
    try {
        const  user_id  = parseInt(req.params.userId);
        if (isNaN(user_id)) {
            return res.status(400).json({ error: `Invalid user ID: ${user_id}` });  // Handle invalid userId
        }
        const updatedFields = req.body;
        const rowCount = await userModel.updateUser({
            userId: user_id, 
            updatedFields: updatedFields
        });

        if (rowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User updated successfully" });
    } catch (err) {
        console.error(err);
        if (err.message === "No valid fields provided for update") {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
};

exports.deleteMembership = async (req, res) => {
    try { 
        const membershipId = parseInt(req.params.membershipId);
        if (isNaN(membershipId)) {
            return res.status(400).json({ error: `Invalid format for membershipId: ${membershipId}`})

        }

        const deleteMembership = await userModel.deleteMembership({membership_id: membershipId})
        return res.status(202).json({
            message: "Membership deleted",
            membership: deleteMembership
        })
    } catch (err){
        res.status(500).json({ error: `Server error: ${err}`})
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user_id = parseInt(req.params.userId);
        if (isNaN(user_id)) {
            return res.status(400).json({ error: `Invalid user ID: ${user_id}`});
        }
        const deletedUser = await userModel.deleteUser({userId: user_id})
        return res.status(202).json({
            message: `User deleted: `,
            user: deletedUser
        })
    } catch (err){
        res.status(500).json({ error: `Server error: ${err}`})
    }
};