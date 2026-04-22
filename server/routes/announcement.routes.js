const express = require("express");

const {
  listAnnouncements,
  listPublishedAnnouncements,
  getAnnouncement,
  createAnnouncement,
  publishAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcement.controller");

const router = express.Router();

router.get("/admin", listAnnouncements);
router.get("/published", listPublishedAnnouncements);
router.route("/").post(createAnnouncement);
router.patch("/:id/publish", publishAnnouncement);
router.route("/:id").get(getAnnouncement).put(updateAnnouncement).delete(deleteAnnouncement);

module.exports = router;
