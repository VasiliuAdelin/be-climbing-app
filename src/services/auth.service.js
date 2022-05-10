const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const Token = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const tokenTypes = require("../config/token.type");

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  // if !user or password don't match return false and throw an error
  const isPasswordMatch = !user
    ? false
    : await user.isPasswordMatching(password);

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      httpStatus[httpStatus.BAD_REQUEST],
      ["Email or password incorrect"]
    );
  }
  return user;
};

module.exports = {
  loginWithEmailAndPassword,
};
