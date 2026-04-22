const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Option title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Option description is required"],
      trim: true,
    },
  },
  {
    _id: true,
    timestamps: true,
    versionKey: false,
  },
);

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    option: {
      type: [optionSchema],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Announcement", announcementSchema);
