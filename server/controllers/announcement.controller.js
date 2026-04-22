const Announcement = require("../app.models/announcement.model");
const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const serializeOption = (item, index) => {
  if (typeof item === "string") {
    return {
      title: String.fromCharCode(65 + index),
      description: item,
    };
  }

  return {
    title: item.title,
    description: item.description,
    id: item._id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
};

const serializeAnnouncement = (announcement) => ({
  id: announcement._id,
  title: announcement.title,
  description: announcement.description || announcement.message,
  isPublish: announcement.isPublished ?? announcement.isPublish ?? false,
  isPublished: announcement.isPublished ?? announcement.isPublish ?? false,
  option: (announcement.option || announcement.options || []).map(serializeOption),
  createdAt: announcement.createdAt,
  updatedAt: announcement.updatedAt,
});

const normalizeAnnouncementPayload = (payload) => {
  const rawOptions = payload.option || payload.options || [];
  const normalizedPayload = {};

  if (hasOwn(payload, "title")) {
    normalizedPayload.title = payload.title;
  }

  if (hasOwn(payload, "description") || hasOwn(payload, "message")) {
    normalizedPayload.description = payload.description || payload.message;
  }

  if (hasOwn(payload, "isPublished") || hasOwn(payload, "isPublish")) {
    normalizedPayload.isPublish = Boolean(payload.isPublished ?? payload.isPublish);
  }

  if (hasOwn(payload, "option") || hasOwn(payload, "options")) {
    normalizedPayload.option = rawOptions.map((item, index) => {
      if (typeof item === "string") {
        return {
          title: String.fromCharCode(65 + index),
          description: item,
        };
      }

      return {
        title: item.title,
        description: item.description,
      };
    });
  }

  return normalizedPayload;
};

const listAnnouncements = async (_req, res) => {
  try {
    const announcements = await Announcement.find().sort({
      isPublish: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements.map(serializeAnnouncement),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
      error: error.message,
    });
  }
};

const publishAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    await Announcement.updateMany(
      { _id: { $ne: announcement._id } },
      { isPublish: false },
    );

    announcement.isPublish = true;
    await announcement.save();

    const announcements = await Announcement.find().sort({
      isPublish: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Announcement published successfully",
      data: serializeAnnouncement(announcement),
      announcements: announcements.map(serializeAnnouncement),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to publish announcement",
      error: error.message,
    });
  }
};

const listPublishedAnnouncements = async (_req, res) => {
  try {
    const announcements = await Announcement.find({ isPublish: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements.map(serializeAnnouncement),
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
      data: serializeAnnouncement(announcement),
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
    const announcementData = normalizeAnnouncementPayload(req.body);

    // If this announcement is being published, unpublish all others
    if (announcementData.isPublish === true) {
      await Announcement.updateMany({}, { isPublish: false });
    }

    const announcement = await Announcement.create(announcementData);

    return res.status(201).json({
      success: true,
      data: serializeAnnouncement(announcement),
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
    const updateData = normalizeAnnouncementPayload(req.body);

    // If this announcement is being published, unpublish all others
    if (updateData.isPublish === true) {
      await Announcement.updateMany({}, { isPublish: false });
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
      data: serializeAnnouncement(announcement),
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
  listPublishedAnnouncements,
  getAnnouncement,
  createAnnouncement,
  publishAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
