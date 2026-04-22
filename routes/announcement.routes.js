const express = require("express");
const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcement.controller");

const router = express.Router();

router.route("/").post(createAnnouncement).get(getAnnouncements);

router
  .route("/:announcementId")
  .get(getAnnouncementById)
  .put(updateAnnouncement)
  .delete(deleteAnnouncement);

module.exports = router;
