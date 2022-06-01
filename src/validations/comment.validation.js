const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createComment = {
  body: Joi.object().keys({
    description: Joi.string().required(),
    author: Joi.required().custom(objectId),
    entityId: Joi.required().custom(objectId),
  }),
};

const getComment = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    description: Joi.string(),
    isHidden: Joi.boolean(),
    isValidated: Joi.boolean()
  }),
};

const deleteComment = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
