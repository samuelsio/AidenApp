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

exports.updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedFields = req.body;
        const rowCount = await userModel.updateUser(id, updatedFields);

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
