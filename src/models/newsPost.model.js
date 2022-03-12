const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");

const NewsFeedSchema = mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      profileImage: {
        type: String,
        required: true,
      },
    },
    likes: {
      type: String,
      default: "0",
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

NewsFeedSchema.plugin(toJSON);

const NewsFeedPost = mongoose.model("NewsFeedPost", NewsFeedSchema);

module.exports = {
  NewsFeedPost,
};
