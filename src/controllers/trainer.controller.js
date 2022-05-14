const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { trainerService } = require("../services");
const { Post, Comment } = require("../models");

const createTrainer = catchAsync(async (req, res) => {
  const trainer = await trainerService.createTrainer(req.body);

  res.status(httpStatus.CREATED).send(trainer);
});

const getTrainers = catchAsync(async (req, res) => {
  const filter = _.pick(req.query, [
    "title",
    "descripton",
    "isHidden",
    "isValidated",
    "author",
  ]);
  const options = _.pick(req.query, ["sortBy", "limit", "page"]);

  let trainers = await trainerService.getTrainers(filter, options);

  res.status(httpStatus.OK).send(trainers);
});

const getTrainerById = catchAsync(async (req, res) => {
  const trainer = await trainerService.getTrainerById(req.params.id);
  if (!trainer) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Trainer not found",
    ]);
  }

  res.status(httpStatus.OK).send(trainer);
});

const updateTrainer = catchAsync(async (req, res) => {
  const trainer = await trainerService.updateTrainerById(
    req.params.id,
    req.body
  );

  res.status(httpStatus.OK).send(trainer);
});

const deleteTrainer = catchAsync(async (req, res) => {
  await trainerService.deleteTrainerById(req.params.id);

  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAll = catchAsync(async (req, res) => {
  await trainerService.deleteAll();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTrainer,
  getTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
  deleteAll,
};
