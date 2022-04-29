const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const commentSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    entityId: {
      type: mongoose.SchemaTypes.ObjectId
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(toJSON);

/**
 * @typedef Comment
 */
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
