const httpStatus = require("http-status");
const { Comment } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create comment
 * @param {Object} comment
 * @returns {Promise<Comment>}
 */
const createComment = async (comment) => {
  return Comment.create(comment);
};

/**
 * Gel All Comments
 * @returns {Promise<Comment>}
 */
const getComments = async () => {
  const comments = await Comment.find({}).populate("author", ["name", "imageLink"]);
  return comments;
};

/**
 * Get Comment by ID
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id) => {
  return Comment.findById(id);
};

/**
 * Get Comment by entityId
 * @param {ObjectId} EntityId
 * @returns {Promise<Comment>}
 */
const getCommentByEntityId = async (entityId) => {
  return Comment.find({ entityId }).populate("author", ["name", "imageLink"]);
};

/**
 * Update comment by id
 * @param {ObjectId} commentId
 * @param {Object} updatedBody
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (commentId, updatedBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }
  Object.assign(comment, updatedBody);
  await comment.save();
  return comment;
};

/**
 * Delete comment by id
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (commentId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }
  await comment.remove();
  return comment;
};

/**
 * Delete All
 * @returns {Promise<Comment>}
 */
const deleteAll = async () => {
  try {
    return await Comment.deleteMany({});
  } catch {
    throw new ApiError(httpStatus.NOT_FOUND, "Comments not able to be deleted");
  }
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  getCommentByEntityId,
  updateCommentById,
  deleteCommentById,
  deleteAll
};
