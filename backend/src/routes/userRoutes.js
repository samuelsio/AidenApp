const express = require("express");
const usersController = require("../controllers/userController");
const { verifyToken } = require("../middleware/jwtMiddleware");
const router = express.Router();


router.get("/", verifyToken, usersController.getUsers);
router.get("/token", verifyToken, usersController.token);
router.get("/profile/:username", verifyToken, usersController.getByUsername)
router.get("/:userId", verifyToken, usersController.getUserDetails)
router.post("/", usersController.createUser);
router.post("/login", usersController.login);
router.post("/addFriend/:username", verifyToken, usersController.addFriend)
router.patch("/:userId", verifyToken, usersController.updateUser);
router.delete("/:userId", verifyToken, usersController.deleteUser)




module.exports = router;
