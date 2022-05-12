const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const trainerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    categories:{
        type: [String],
        default: []
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
    isValidated: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

trainerSchema.plugin(paginate);
trainerSchema.plugin(toJSON);

/**
 * @typedef Trainer
 */
const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
