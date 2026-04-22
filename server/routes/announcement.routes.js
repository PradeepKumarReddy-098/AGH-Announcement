const express = require("express");

const {
  listAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcement.controller");

const router = express.Router();

router.route("/").get(listAnnouncements).post(createAnnouncement);
router.route("/:id").get(getAnnouncement).put(updateAnnouncement).delete(deleteAnnouncement);

module.exports = router;
