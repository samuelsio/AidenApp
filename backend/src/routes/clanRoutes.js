const express = require("express");
const clanController = require("../controllers/clanController");
const router = express.Router();

router.get("/", clanController.getClans);
router.get("/:clanName", clanController.getClanDetails)
router.get("/:clanName/bulletin", clanController.getBulletinBoard)
router.get("/:clanName/:eventId/comments", clanController.getEventComments)
router.post("/", clanController.createClan);
router.post("/:clanName/event", clanController.createEvent)
router.post("/:clanName/:eventId", clanController.createEventComment)
router.post("/:clanName/bulletin/comment", clanController.createBulletinComment)
router.delete("/:clanId", clanController.deleteClan)
router.patch("/:clanId", clanController.updateClan);

module.exports = router;
