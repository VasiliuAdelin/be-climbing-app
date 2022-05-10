const httpStatus = require("http-status");
const { NewsPost } = require("../models");
const ApiError = require("../utils/ApiError");

const createPost = async (newsPost) => {
  if (await NewsFeedPost.inLinkValid(newsPost.link)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The link does not lead to an image."
    );
  }
  return NewsFeedPost.create(newsPost);
};

module.exports = {
  createPost,
};
