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
    timestamps: true,
  }
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
    isPublish: {
      type: Boolean,
      default: false,
    },
    option: {
      type: [optionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;

        if (Array.isArray(ret.option)) {
          ret.option = ret.option.map((item) => ({
            ...item,
            id: item._id.toString(),
            _id: undefined,
          }));
        }

        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Announcement", announcementSchema);
