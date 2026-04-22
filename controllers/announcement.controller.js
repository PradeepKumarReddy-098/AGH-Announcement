const Announcement = require("../app.models/announcement.model");

const unpublishOtherAnnouncements = async (announcementId) => {
  await Announcement.updateMany(
    { _id: { $ne: announcementId } },
    { $set: { isPublish: false } }
  );
};

const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);

    if (announcement.isPublish) {
      await unpublishOtherAnnouncements(announcement._id);
    }

    return res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: announcement,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAnnouncements = async (_req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.announcementId);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.announcementId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    if (announcement.isPublish) {
      await unpublishOtherAnnouncements(announcement._id);
    }

    return res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      data: announcement,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(
      req.params.announcementId
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
