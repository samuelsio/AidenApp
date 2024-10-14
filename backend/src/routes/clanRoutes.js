const express = require("express");
const clanController = require("../controllers/clanController");
const { verifyToken } = require("../middleware/jwtMiddleware");
const router = express.Router();

router.get("/", verifyToken, clanController.getClans);
router.get("/events", verifyToken, clanController.getAllEvents)
router.get("/events/:eventId", verifyToken, clanController.getEventDetails)
router.get("/:clanName", verifyToken, clanController.getClanDetails)
router.get("/:clanName/bulletin", verifyToken, clanController.getBulletinBoard)
router.get("/:clanName/:eventId/comments", verifyToken, clanController.getEventComments)
router.get("/:clanName/:postId", verifyToken, clanController.getBulletinBoardPost)
router.get("/:clanName/:eventId/:commentId", verifyToken, clanController.getIndividualComment)
router.post("/", verifyToken, clanController.createClan);
router.post("/:clanName/event", verifyToken, clanController.createEvent)
router.post("/:clanName/:eventId", verifyToken, clanController.createEventComment)
router.post("/:clanName/bulletin/comment", verifyToken, clanController.createBulletinComment)
router.patch("/:clanId", verifyToken, clanController.updateClan);
router.patch("/:clanName/:eventId", verifyToken, clanController.updateEvent)
router.delete("/:clanName/bulletin/:postId", verifyToken, clanController.deleteBulletin)
router.delete("/:clanName/events/:eventId", verifyToken, clanController.deleteEvent)
router.delete("/:clanId", verifyToken, clanController.deleteClan)
router.patch("/:clanId", verifyToken, clanController.updateClan);
router.patch("/:clanName/:eventId/:commentId", verifyToken, clanController.patchIndividualComment)
router.delete("/:clanName/:eventId/:commentId", verifyToken, clanController.deleteIndividualComment)
module.exports = router;