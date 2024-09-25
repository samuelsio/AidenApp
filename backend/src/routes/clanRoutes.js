const express = require("express");
const clanController = require("../controllers/clanController");
const router = express.Router();

router.get("/", clanController.getClans);
router.get("/events", clanController.getAllEvents)
router.get("/events/:eventId", clanController.getEventDetails)
router.get("/:clanName", clanController.getClanDetails)
router.get("/:clanName/bulletin", clanController.getBulletinBoard)
router.post("/", clanController.createClan);
router.post("/:clanName/event", clanController.createEvent)
router.post("/:clanName/:eventId", clanController.createEventComment)
router.post("/:clanName/bulletin/comment", clanController.createBulletinComment)
router.patch("/:id", clanController.updateClan);
router.delete("/:clanName/events/:eventId", clanController.deleteEvent)
module.exports = router;
