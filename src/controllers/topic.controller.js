const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { topicService, commentService } = require("../services");
const { Post, Comment } = require("../models");

const createTopic = catchAsync(async (req, res) => {
  const topic = await topicService.createTopic(req.body);

  res.status(httpStatus.CREATED).send(topic);
});

const getTopics = catchAsync(async (req, res) => {
  const filter = _.pick(req.query, [
    "title",
    "name",
    "isHidden",
    "isValidated",
    "author",
  ]);
  const options = _.pick(req.query, ["sortBy", "limit", "page"]);

  let topics = await topicService.getTopics(filter, options);

  res.status(httpStatus.OK).send(topics);
});

const getTopicById = catchAsync(async (req, res) => {
  const topic = await topicService.getTopicById(req.params.id);

  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Topic not found",
    ]);
  }

  const {
    __v,
    _id,
    name,
    author,
    title,
    body,
    views,
    createdAt,
    updatedAt
  } = topic;

  const comments = await commentService.getCommentByEntityId(topic.id);
  
  const payload = {
    id: _id,
    name,
    author,
    title,
    body,
    views,
    createdAt,
    updatedAt,
    comments
  }

  res.status(httpStatus.OK).send(payload);
});

const getTopicsDistinct = catchAsync(async (req, res) => {
  const topics = await topicService.getDistinctTopics();

  res.status(httpStatus.OK).send(topics);
});

const updateTopic = catchAsync(async (req, res) => {
  const topic = await topicService.updateTopicById(
    req.params.id,
    req.body
  );

  res.status(httpStatus.OK).send(topic);
});

const deleteTopic = catchAsync(async (req, res) => {
  await topicService.deleteTopicById(req.params.id);

  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAll = catchAsync(async (req, res) => {
  await topicService.deleteAll();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTopic,
  getTopics,
  getTopicById,
  getTopicsDistinct,
  updateTopic,
  deleteTopic,
  deleteAll,
};
