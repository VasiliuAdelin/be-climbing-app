const httpStatus = require("http-status");
const { Event } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create event
 * @param {Object} event
 * @returns {Promise<Event>}
 */
const createEvent = async (event) => Event.create(event);

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getEvents = async (filter, options) => {
  const events = await Event.paginate(filter, options);
  return events;
};

/**
 * Get Event by ID
 * @param {ObjectId} id
 * @returns {Promise<Event>}
 */
const getEventById = async (id) => {
  return Event.findById(id).populate("author", ["name", "imageLink"]);
};

/**
 * Update event by id
 * @param {ObjectId} eventId
 * @param {Object} updatedBody
 * @returns {Promise<Event>}
 */
const updateEventById = async (eventId, updatedBody) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }

  Object.assign(event, updatedBody);
  await event.save();
  return event;
};

/**
 * Delete event by id
 * @param {ObjectId} id
 * @returns {Promise<Event>}
 */
const deleteEventById = async (eventId) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  await event.remove();
  return event;
};

/**
 * Delete All
 * @returns {Promise<event>}
 */
const deleteAll = async () => {
  try {
    return await Event.deleteMany({});
  } catch {
    throw new ApiError(httpStatus.NOT_FOUND, "Events not able to be deleted");
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  deleteAll,
};
