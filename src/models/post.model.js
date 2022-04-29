const mongoose = require("mongoose");
const { paginate, toJSON } = require("./plugins");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
    location: {
      type: String,
      trim: true,
      default: null,
    },
    geoLocation: {
      type: String,
      trim: true,
      default: null,
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
    likes: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
      default: []
    }
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(paginate);
postSchema.plugin(toJSON);

/**
 * @typedef Post
 */
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
