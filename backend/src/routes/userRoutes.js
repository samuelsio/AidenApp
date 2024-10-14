const express = require("express");
const usersController = require("../controllers/userController");
const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/memberships", usersController.getAllMemberships)
router.get("/users/:userId", usersController.getUserDetails)
router.get("/membership/:userId/:clanId", usersController.getMembershipDetailedView)
router.get("/memberships/user/:userId/", usersController.getMembershipDetail)
router.get("/memberships/clan/:clanId/", usersController.getMembershipDetail)
router.post("/", usersController.createUser);
router.post("/memberships", usersController.createMembership)
router.patch("/memberships/:membershipId", usersController.updateMembership)
router.patch("/users/:userId", usersController.updateUser);
router.delete("/users/:userId", usersController.deleteUser)
router.delete("/memberships/:membershipId", usersController.deleteMembership)
module.exports = router;
