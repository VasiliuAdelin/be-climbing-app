const Joi = require("joi");
const { customPasswordValidation } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(customPasswordValidation),
    name: Joi.string().required(),
  }),
};
const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(customPasswordValidation),
  }),
};

module.exports = {
  register,
  login,
};
