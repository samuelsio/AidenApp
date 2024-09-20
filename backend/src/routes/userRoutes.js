const express = require("express");
const usersController = require("../controllers/userController");
const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:userId", usersController.getUserDetails)
router.post("/", usersController.createUser);
router.patch("/:userId", usersController.updateUser);

module.exports = router;
