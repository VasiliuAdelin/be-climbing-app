const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { newsPostService } = require("../services");

const createNewsPost = catchAsync(async (req, res) => {
  const newsPost = await newsPostService.createPost(req.body);
  res.status(httpStatus.OK).send({
    results: newsPost,
  });
});

module.exports = {
  createNewsPost,
};
