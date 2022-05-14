const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const topicSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
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

topicSchema.plugin(paginate);
topicSchema.plugin(toJSON);

/**
 * @typedef Topic
 */
const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
