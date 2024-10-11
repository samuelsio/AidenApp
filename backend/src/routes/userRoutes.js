const express = require("express");
const usersController = require("../controllers/userController");
const { verifyToken } = require("../middleware/jwtMiddleware");
const router = express.Router();


router.get("/", verifyToken, usersController.getUsers);
router.get("/verifyAdmin", verifyToken, usersController.verifyAdmin )
router.get("/token", verifyToken, usersController.token);
router.get("/profile/:username", verifyToken, usersController.getByUsername)
router.get("/details/:userId", verifyToken, usersController.getUserDetails)
router.post("/", usersController.createUser);
router.post("/login", usersController.login);
router.post("/adminPortal", usersController.adminPortal)
router.post("/addFriend/:username", verifyToken, usersController.addFriend)
router.patch("/:userId", verifyToken, usersController.updateUser);
router.delete("/:userId", verifyToken, usersController.deleteUser)




module.exports = router;
