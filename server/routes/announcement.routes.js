const express = require("express");

const {
  listAnnouncements,
  listPublishedAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcement.controller");

const router = express.Router();

router.get("/admin", listAnnouncements);
router.get("/published", listPublishedAnnouncements);
router.route("/").post(createAnnouncement);
router.route("/:id").get(getAnnouncement).put(updateAnnouncement).delete(deleteAnnouncement);

module.exports = router;
