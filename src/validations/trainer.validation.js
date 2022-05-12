const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createEvent = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    categories: Joi.array(),
    description: Joi.string().required(),
    author: Joi.required().custom(objectId),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limmit: Joi.string(),
    page: Joi.string(),
    isHidden: Joi.string(),
    isValidated: Joi.string(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateEvent = {
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

const deleteEvent = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
