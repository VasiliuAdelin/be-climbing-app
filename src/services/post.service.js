const httpStatus = require("http-status");
const { Post } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create post
 * @param {Object} post
 * @returns {Promise<Post>}
 */
const createPost = async (post) => Post.create(post);

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options)
  return posts;
};

/**
 * Get Post by ID
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
  return Post.findById(id).populate("author", ["name", "imageLink"]);
};

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} updatedBody
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, updatedBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }

  Object.assign(post, updatedBody);
  await post.save();
  return post;
};

/**
 * Delete post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const deletePostById = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
  }
  await post.remove();
  return post;
};

/**
 * Delete All
 * @returns {Promise<post>}
 */
const deleteAll = async () => {
  try {
    return await Post.deleteMany({});
  } catch {
    throw new ApiError(httpStatus.NOT_FOUND, "Posts not able to be deleted");
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  deleteAll,
};
