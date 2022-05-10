const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.required().custom(objectId),
    location: Joi.string(),
    geoLocation: Joi.string(),
    assets: Joi.array(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limmit: Joi.string(),
    page: Joi.string(),
    isHidden: Joi.string(),
    isValidated: Joi.string(),
    author: Joi.string().custom(objectId),
  }),
};

const getPost = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    author: Joi.custom(objectId),
    location: Joi.string(),
    geoLocation: Joi.string(),
    assets: Joi.array(),
    likes: Joi.array()
  }),
};

const deletePost = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
