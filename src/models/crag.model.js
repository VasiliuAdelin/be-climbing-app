const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const cragSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: [Number],
      default: [0, 0, 0, 0, 0],
    },
    city: {
      type: Number,
      required: true,
    },
    country: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    geoLocation: {
      type: String,
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
    features: {
      type: [String],
      required: true,
    },
    likes: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
    },
    ascents: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
    },
    interested: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

cragSchema.plugin(paginate);
cragSchema.plugin(toJSON);

/**
 * @typedef Crag
 */
const Crag = mongoose.model("Crag", cragSchema);

module.exports = Crag;
