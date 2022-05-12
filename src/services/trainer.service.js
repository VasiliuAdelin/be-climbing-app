const httpStatus = require("http-status");
const { Trainer } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create trainer
 * @param {Object} trainer
 * @returns {Promise<Trainer>}
 */
const createTrainer = async (trainer) => Trainer.create(trainer);

const getTrainers = async (filter, options) => {
  return Trainer.paginate(filter, options);
};

/**
 * Get Trainer by ID
 * @param {ObjectId} id
 * @returns {Promise<Trainer>}
 */
const getTrainerById = async (id) => {
  return Trainer.findById(id).populate("author", ["name", "imageLink"]);
};

/**
 * Update trainer by id
 * @param {ObjectId} trainerId
 * @param {Object} updatedBody
 * @returns {Promise<Trainer>}
 */
const updateTrainerById = async (trainerId, updatedBody) => {
  const trainer = await getTrainerById(trainerId);
  if (!trainer) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }

  Object.assign(trainer, updatedBody);
  await trainer.save();
  return trainer;
};

/**
 * Delete trainer by id
 * @param {ObjectId} id
 * @returns {Promise<Trainer>}
 */
const deleteTrainerById = async (trainerId) => {
  const trainer = await getTrainerById(trainerId);
  if (!trainer) {
    throw new ApiError(httpStatus.NOT_FOUND, "Trainer not found");
  }
  await trainer.remove();
  return trainer;
};

/**
 * Delete All
 * @returns {Promise<trainer>}
 */
const deleteAll = async () => {
  try {
    return await Trainer.deleteMany({});
  } catch {
    throw new ApiError(httpStatus.NOT_FOUND, "Trainers not able to be deleted");
  }
};

module.exports = {
  createTrainer,
  getTrainers,
  getTrainerById,
  updateTrainerById,
  deleteTrainerById,
  deleteAll,
};
