const Announcement = require("../app.models/announcement.model");

const listAnnouncements = async (_req, res) => {
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
      message: "Failed to fetch announcements",
      error: error.message,
    });
  }
};

const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

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
    return res.status(400).json({
      success: false,
      message: "Failed to fetch announcement",
      error: error.message,
    });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const announcementData = req.body;

    // If this announcement is being published, unpublish all others
    if (announcementData.isPublished === true) {
      await Announcement.updateMany({}, { isPublished: false });
    }

    const announcement = await Announcement.create(announcementData);

    return res.status(201).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create announcement",
      error: error.message,
    });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const updateData = req.body;

    // If this announcement is being published, unpublish all others
    if (updateData.isPublished === true) {
      await Announcement.updateMany({}, { isPublished: false });
    }

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

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
    return res.status(400).json({
      success: false,
      message: "Failed to update announcement",
      error: error.message,
    });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

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
    return res.status(400).json({
      success: false,
      message: "Failed to delete announcement",
      error: error.message,
    });
  }
};

module.exports = {
  listAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
