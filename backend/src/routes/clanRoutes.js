const express = require("express");
const clanController = require("../controllers/clanController");
const router = express.Router();

router.get("/", clanController.getClans);
router.get("/:clanName", clanController.getClanDetails)
router.get("/:clanName/bulletin", clanController.getBulletinBoard)
router.get("/:clanName/:eventId/:commentId", clanController.getIndividualComment)
router.post("/", clanController.createClan);
router.post("/:clanName/event", clanController.createEvent)
router.post("/:clanName/:eventId", clanController.createEventComment)
router.post("/:clanName/bulletin/comment", clanController.createBulletinComment)
router.patch("/:id", clanController.updateClan);
router.patch("/:clanName/:eventId/:commentId", clanController.patchIndividualComment)
router.delete("/:clanName/:eventId/:commentId", clanController.deleteIndividualComment)
module.exports = router;
