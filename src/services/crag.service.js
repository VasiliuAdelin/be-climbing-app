const httpStatus = require("http-status");
const { Crag } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create crag
 * @param {Object} crag
 * @returns {Promise<Crag>}
 */
const createCrag = async (crag) => Crag.create(crag);

/**
 * Query for crags
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getCrags = async (filter, options) => {
  const crags = await Crag.paginate(filter, options);
  return crags;
};

/**
 * Get Crag by ID
 * @param {ObjectId} id
 * @returns {Promise<Crag>}
 */
const getCragById = async (id) => {
  return Crag.findById(id).populate("author", ["name", "imageLink"]);
};

/**
 * Update crag by id
 * @param {ObjectId} cragId
 * @param {Object} updatedBody
 * @returns {Promise<Crag>}
 */
const updateCragById = async (cragId, updatedBody) => {
  const crag = await getCragById(cragId);
  if (!crag) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }

  Object.assign(crag, updatedBody);
  await crag.save();
  return crag;
};

/**
 * Delete crag by id
 * @param {ObjectId} id
 * @returns {Promise<Crag>}
 */
const deleteCragById = async (cragId) => {
  const crag = await getCragById(cragId);
  if (!crag) {
    throw new ApiError(httpStatus.NOT_FOUND, "Crag not found");
  }
  await crag.remove();
  return crag;
};

/**
 * Delete All
 * @returns {Promise<crag>}
 */
const deleteAll = async () => {
  try {
    return await Crag.deleteMany({});
  } catch {
    throw new ApiError(httpStatus.NOT_FOUND, "Crags not able to be deleted");
  }
};

module.exports = {
  createCrag,
  getCrags,
  getCragById,
  updateCragById,
  deleteCragById,
  deleteAll,
};
