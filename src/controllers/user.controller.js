const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService, commentService, postService, cragService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers(req.body);
  res.status(httpStatus.OK).send({
    results: users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "User not found",
    ]);
  }
  res.status(httpStatus.OK).send(user);
});

const getUserProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "User not found",
    ]);
  }

  const {
    __v,
    _id,
    address,
    city,
    country,
    createdAt,
    description,
    email,
    id,
    imageLink,
    isEmailVerified,
    name,
    position,
    postalCode,
    role,
    updatedAt,
    username,
    mainImage
  } = user;

  const comments = await commentService.getCommentByEntityId(user.id);
  const ascentsResult = await cragService.getCragsByField('ascents', user.id)
  const interestedResult = await cragService.getCragsByField('interested', user.id)

  const payload = {
    id: _id,
    address,
    city,
    country,
    createdAt,
    description,
    email,
    id,
    imageLink,
    isEmailVerified,
    name,
    position,
    postalCode,
    role,
    updatedAt,
    username,
    comments,
    mainImage,
    totalAscents: ascentsResult.length || 0,
    totalInterested: interestedResult.length || 0
  };

  res.status(httpStatus.OK).send(payload);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.status(httpStatus.OK).send({ user });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserProfile,
  updateUser,
  deleteUser,
};
