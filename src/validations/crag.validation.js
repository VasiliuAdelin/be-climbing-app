const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createCrag = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    grade: Joi.number().required(),
    type: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    description: Joi.string(),
    address: Joi.string(),
    geoLocation: Joi.string(),
    author: Joi.custom(objectId).required(),
    assets: Joi.array(),
    isValidated: Joi.boolean(),
    isHidden: Joi.boolean(),
    features: Joi.array().required(),
  }),
};

const getCrags = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limmit: Joi.string(),
    page: Joi.string(),
    isHidden: Joi.string(),
    isValidated: Joi.string(),
    author: Joi.string().custom(objectId),
    city: Joi.string(),
    country: Joi.string(),
  }),
};

const getCrag = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateCrag = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    grade: Joi.number(),
    type: Joi.string(),
    name: Joi.string(),
    name: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    address: Joi.string(),
    description: Joi.string(),
    geoLocation: Joi.string(),
    author: Joi.custom(objectId),
    assets: Joi.array(),
    isValidated: Joi.boolean(),
    isHidden: Joi.boolean(),
    features: Joi.array(),
    likes: Joi.array(),
    ascents: Joi.array(),
    interested: Joi.array(),
    rating: Joi.array(),
  }),
};

const deleteCrag = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createCrag,
  getCrags,
  getCrag,
  updateCrag,
  deleteCrag,
};
