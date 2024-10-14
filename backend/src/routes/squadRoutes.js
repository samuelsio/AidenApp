const express = require("express");
const usersController = require("../controllers/userController");
const { verifyToken } = require("../middleware/jwtMiddleware");
const router = express.Router();

// router.get("/", verifyToken, squadController.getUsers);

module.exports = router;
