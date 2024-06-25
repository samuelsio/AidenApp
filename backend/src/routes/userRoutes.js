const express = require("express");
const usersController = require("../controllers/userController");
const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.patch("/:id", usersController.updateUser);

module.exports = router;
