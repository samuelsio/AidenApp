const express = require("express");
const usersController = require("../controllers/userController");
const { verifyToken } = require("../middleware/jwtMiddleware");
const router = express.Router();

router.get("/", verifyToken, usersController.getUsers);
router.get("/memberships", verifyToken, usersController.getAllMemberships)
router.get("/verifyAdmin", verifyToken, usersController.verifyAdmin )
router.get("/token", verifyToken, usersController.token);
router.get("/users/:userId", verifyToken, usersController.getUserDetails)
router.get("/profile/:username", verifyToken, usersController.getByUsername)
router.get("/details/:userId", verifyToken, usersController.getUserDetails)
router.get("/memberships/user/:userId/", verifyToken, usersController.getMembershipDetail)
router.get("/memberships/clan/:clanId/", verifyToken, usersController.getMembershipDetail)
router.get("/membership/:userId/:clanId", verifyToken, usersController.getMembershipDetailedView)
router.post("/", usersController.createUser);
router.post("/login", usersController.login);
router.post("/adminPortal", verifyToken, usersController.adminPortal)
router.post("/memberships", verifyToken, usersController.createMembership)
router.post("/addFriend/:username", verifyToken, usersController.addFriend)
router.patch("/users/:userId", verifyToken, usersController.updateUser);
router.patch("/memberships/:membershipId", verifyToken, usersController.updateMembership)
router.patch("/:userId", verifyToken, usersController.updateUser);
router.delete("/users/:userId", verifyToken, usersController.deleteUser)
router.delete("/memberships/:membershipId", verifyToken, usersController.deleteMembership)
router.delete("/:userId", verifyToken, usersController.deleteUser)

module.exports = router;