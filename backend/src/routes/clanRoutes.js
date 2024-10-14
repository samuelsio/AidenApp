const express = require("express");
const clanController = require("../controllers/clanController");
const { verifyToken } = require("../middleware/jwtMiddleware");
const router = express.Router();

router.get("/", verifyToken, clanController.getClans);
router.get("/events", clanController.getAllEvents)
router.get("/events/:eventId", clanController.getEventDetails)
router.get("/:clanName", verifyToken, clanController.getClanDetails)
router.get("/:clanName/bulletin", verifyToken, clanController.getBulletinBoard)
router.get("/:clanName/:eventId/comments", clanController.getEventComments)
router.get("/:clanName/:postId", clanController.getBulletinBoardPost)
router.get("/:clanName/:eventId/:commentId", clanController.getIndividualComment)
router.post("/", verifyToken, clanController.createClan);
router.post("/:clanName/event", verifyToken, clanController.createEvent)
router.post("/:clanName/:eventId", verifyToken, clanController.createEventComment)
router.post("/:clanName/bulletin/comment", verifyToken, clanController.createBulletinComment)
router.patch("/:clanId", clanController.updateClan);
router.patch("/:clanName/:eventId", clanController.updateEvent)
router.delete("/:clanName/bulletin/:postId", clanController.deleteBulletin)
router.delete("/:clanName/events/:eventId", clanController.deleteEvent)
router.delete("/:clanId", verifyToken, clanController.deleteClan)
router.patch("/:clanId", verifyToken, clanController.updateClan);
router.patch("/:clanName/:eventId/:commentId", clanController.patchIndividualComment)
router.delete("/:clanName/:eventId/:commentId", clanController.deleteIndividualComment)
module.exports = router;