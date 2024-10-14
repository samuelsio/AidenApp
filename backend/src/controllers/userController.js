const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config(); 
const SECRET_KEY = process.env.JWT_SECRET; 


exports.token = async (req, res) => {
    // This will be handled by the verifyToken middleware, which attaches the decoded token to req.user
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // If the token is valid, send the user details or any relevant info back to the client
    res.status(200).json({
        message: "Token is valid",
        user: {
            user_id: req.user.user_id,
            email: req.user.email,
            displayname: req.user.displayname,
            username: req.user.username,
            role: req.user.role,
        },
    });
};

exports.verifyAdmin = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(req.user)
    if (req.user.role !== "admin"){
        return res.status(401).json({error: "Unauthorized" });
    }
    res.status(200).json({
        message: "Token is valid",
        user: {
            user_id: req.user.user_id,
            email: req.user.email,
            displayname: req.user.displayname,
            username: req.user.username,
            role: req.user.role,
        },
    });
};


exports.adminPortal = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userArray = await userModel.getUserByEmail(email);
  
        if (!userArray || userArray.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const user = userArray[0]; 
    
        const hashedPassword = user.password;
        if (!hashedPassword) {
            return res.status(500).json({ error: "Password not found for the user" });
        }

        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

         if (user.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
        const payload = {
            user_id: user.user_id,
            email: user.email,
            displayname: user.displayname,
            username: user.username,
            role: user.role || 'member',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };

        // If the password is valid, generate a JWT token
        const token = jwt.sign(payload, SECRET_KEY);

        // Send the token to the client
        res.status(200).json({
            message: "Login successful",
            token: token, 
            username: user.username,
            role: user.role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userArray = await userModel.getUserByEmail(email);
        
        // Ensure that a user was found
        if (!userArray || userArray.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = userArray[0]; // Since it's an array, get the first user object
        
        // Ensure the password is hashed and available
        const hashedPassword = user.password;
        if (!hashedPassword) {
            return res.status(500).json({ error: "Password not found for the user" });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const payload = {
            user_id: user.user_id,
            email: user.email,
            displayname: user.displayname,
            username: user.username,
            role: user.role || 'user',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };

        // If the password is valid, generate a JWT token
        const token = jwt.sign(payload, SECRET_KEY);

        // Send the token to the client
        res.status(200).json({
            message: "Login successful",
            token: token, 
            username: user.username,// Token can be used for future authenticated requests
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


exports.getByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userModel.getByUsername(username);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user[0])
    } catch (err) {
        console.err(err);
        res.status(500).json({ error: "Server error"});
    }
}


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


exports.addFriend = async (req, res) => {
    try {
        const friend = req.params.username;
        const user = req.body.username;

        const addedFriend = await userModel.addFriend({friend: friend, user: user})
        res.status(201).json({
            message: `Sent friend request: ${addedFriend}`
        })
    } catch (err) {
        return res.status.json({ error: err.message })

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
        if (err.message.startsWith("Unique constraint violated:")) {
            console.error(err);
            return res.status(400).json({ error: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: "Server error "});
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