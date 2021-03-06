const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createTrainer = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    categories: Joi.array(),
    description: Joi.string().required(),
    author: Joi.required().custom(objectId),
  }),
};

const getTrainers = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.string(),
    page: Joi.string(),
    isHidden: Joi.string(),
    isValidated: Joi.string(),
  }),
};

const getTrainer = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateTrainer = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    categories: Joi.array(),
    description: Joi.string(),
    author: Joi.custom(objectId),
  }),
};

const deleteTrainer = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
};
