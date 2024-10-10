const express = require("express");
const clanController = require("../controllers/clanController");
const { verifyToken } = require("../middleware/jwtMiddleware");
const router = express.Router();

router.get("/", verifyToken, clanController.getClans);
router.get("/:clanName", verifyToken, clanController.getClanDetails)
router.get("/:clanName/bulletin", verifyToken, clanController.getBulletinBoard)
router.post("/", verifyToken, clanController.createClan);
router.post("/:clanName/event", verifyToken, clanController.createEvent)
router.post("/:clanName/:eventId", verifyToken, clanController.createEventComment)
router.post("/:clanName/bulletin/comment", verifyToken, clanController.createBulletinComment)
router.delete("/:clanId", verifyToken, clanController.deleteClan)
router.patch("/:clanId", verifyToken, clanController.updateClan);

module.exports = router;
