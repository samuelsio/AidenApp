const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Define a secret key for JWT (in production, store it in environment variables)
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userArray = await userModel.getUserByEmail(email); // Assuming this returns an array of users
        
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

        // If the password is valid, generate a JWT token
        const token = jwt.sign(
            { userId: user.user_id, email: user.email }, // Payload data
            SECRET_KEY, // Secret key
            { expiresIn: "1h" } // Token expiration
        );

        // Send the token to the client
        res.status(200).json({
            message: "Login successful",
            token: token, // Token can be used for future authenticated requests
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
}