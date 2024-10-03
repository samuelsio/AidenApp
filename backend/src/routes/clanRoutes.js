const express = require("express");
const clanController = require("../controllers/clanController");
const router = express.Router();

router.get("/", clanController.getClans);
router.get("/events", clanController.getAllEvents)
router.get("/events/:eventId", clanController.getEventDetails)
router.get("/:clanName", clanController.getClanDetails)
router.get("/:clanName/bulletin", clanController.getBulletinBoard)
router.get("/:clanName/:eventId/comments", clanController.getEventComments)
router.get("/:clanName/:postId", clanController.getBulletinBoardPost)
router.get("/:clanName/:eventId/:commentId", clanController.getIndividualComment)
router.post("/", clanController.createClan);
router.post("/:clanName/event", clanController.createEvent)
router.post("/:clanName/:eventId", clanController.createEventComment)
router.post("/:clanName/bulletin/comment", clanController.createBulletinComment)
router.patch("/:clanId", clanController.updateClan);
router.patch("/:clanName/:eventId", clanController.updateEvent)
router.delete("/:clanName/bulletin/:postId", clanController.deleteBulletin)
router.delete("/:clanName/events/:eventId", clanController.deleteEvent)
router.delete("/:clanId", clanController.deleteClan)
router.patch("/:clanId", clanController.updateClan);
router.patch("/:clanName/:eventId/:commentId", clanController.patchIndividualComment)
router.delete("/:clanName/:eventId/:commentId", clanController.deleteIndividualComment)
module.exports = router;