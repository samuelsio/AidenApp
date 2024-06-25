const userModel = require("../models/userModel");

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await userModel.createUser(req.body);
        res.status(201).send(`User added with ID: ${user.user_id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userModel.updateUser(id, req.body);
        res.send(`User updated with ID: ${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
