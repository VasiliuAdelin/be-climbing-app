const httpStatus = require("http-status");
const { Topic } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create topic
 * @param {Object} topic
 * @returns {Promise<Topic>}
 */
const createTopic = async (topic) => Topic.create(topic);

const getTopics = async (filter, options) => {
  return Topic.paginate(filter, options, 'author', ["name", "imageLink"]);
};

const getDistinctTopics = async (field = 'name') => {
  return Topic.find({}).distinct(field)
};

/**
 * Get Topic by ID
 * @param {ObjectId} id
 * @returns {Promise<Topic>}
 */
const getTopicById = async (id) => {
  return Topic.findById(id).populate("author", ["name", "imageLink"]);
};

/**
 * Update topic by id
 * @param {ObjectId} topicId
 * @param {Object} updatedBody
 * @returns {Promise<Topic>}
 */
const updateTopicById = async (topicId, updatedBody) => {
  const topic = await getTopicById(topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }

  Object.assign(topic, updatedBody);
  await topic.save();
  return topic;
};

/**
 * Delete topic by id
 * @param {ObjectId} id
 * @returns {Promise<Topic>}
 */
const deleteTopicById = async (topicId) => {
  const topic = await getTopicById(topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, "Topic not found");
  }
  await topic.remove();
  return topic;
};

/**
 * Delete All
 * @returns {Promise<topic>}
 */
const deleteAll = async () => {
  try {
    return await Topic.deleteMany({});
  } catch {
    throw new ApiError(httpStatus.NOT_FOUND, "Topics not able to be deleted");
  }
};

module.exports = {
  createTopic,
  getTopics,
  getTopicById,
  getDistinctTopics,
  updateTopicById,
  deleteTopicById,
  deleteAll,
};
