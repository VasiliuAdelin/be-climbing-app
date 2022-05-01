const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    typeOfEvent: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        city: String,
        country: String,
        address: String,
        geoLocation: String,
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    assets: {
      type: [String],
      default: [],
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    participants: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: [],
    },
    interested: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.plugin(paginate);
eventSchema.plugin(toJSON);

/**
 * @typedef Event
 */
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
