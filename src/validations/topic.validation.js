const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createTopic = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    name: Joi.string().required(),
    body: Joi.string().required(),
    author: Joi.required().custom(objectId),
  }),
};

const getTopics = {
  query: Joi.object().keys({
    title: Joi.string(),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.string(),
    page: Joi.string(),
    isHidden: Joi.string(),
    isValidated: Joi.string(),
  }),
};

const getTopic = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateTopic = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    name: Joi.string(),
    body: Joi.string(),
    author: Joi.custom(objectId),
    views: Joi.number()
  }),
};

const deleteTopic = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
};
