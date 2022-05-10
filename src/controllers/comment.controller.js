const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { commentService } = require("../services");

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  res.status(httpStatus.CREATED).send(comment);
});

const getComments = catchAsync(async (req, res) => {
  const comments = await commentService.getComments(req.body);
  res.status(httpStatus.OK).send({
    results: comments,
  });
});

const getCommentById = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.id);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Comment not found",
    ]);
  }
  res.status(httpStatus.OK).send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).send({ comment });
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAll = catchAsync(async (req, res) => {
  await commentService.deleteAll();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComment,
  getComments,
  deleteAll,
  getCommentById,
  updateComment,
  deleteComment,
};
