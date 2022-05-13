const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createEvent = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    month: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    typeOfEvent: Joi.string().required(),
    duration: Joi.string().required(),
    eventDate: Joi.string().required(),
    author: Joi.required().custom(objectId),
    location: Joi.object().keys({
      city: Joi.string(),
      country: Joi.string(),
      address: Joi.string(),
      geoLocation: Joi.string(),
    }),
    assets: Joi.array(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.string(),
    page: Joi.string(),
    isHidden: Joi.string(),
    isValidated: Joi.string(),
    author: Joi.string().custom(objectId),
    month: Joi.number(),
    year: Joi.number(),
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
    month: Joi.number(),
    year: Joi.number(),
    description: Joi.string(),
    typeOfEvent: Joi.string(),
    duration: Joi.string(),
    eventDate: Joi.string(),
    author: Joi.custom(objectId),
    location: Joi.object().keys({
      city: Joi.string(),
      country: Joi.string(),
      address: Joi.string(),
      geoLocation: Joi.string(),
    }),
    assets: Joi.array(),
    participants: Joi.array(),
    interested: Joi.array(),
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
