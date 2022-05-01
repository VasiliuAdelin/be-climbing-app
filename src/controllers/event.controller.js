const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { eventService, userService, commentService } = require("../services");

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);

  res.status(httpStatus.CREATED).send(event);
});

const getEvents = catchAsync(async (req, res) => {
  const filter = _.pick(req.query, [
    "title",
    "descripton",
    "isHidden",
    "isValidated",
    "author",
    "month",
    "year",
  ]);
  const options = _.pick(req.query, ["sortBy", "limit", "page"]);

  let events = await eventService.getEvents(filter, options);

  res.status(httpStatus.OK).send(events);
});

const getEventById = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Event not found",
    ]);
  }

  res.status(httpStatus.OK).send(event);
});

const updateEvent = catchAsync(async (req, res) => {
  const event = await eventService.updateEventById(req.params.id, req.body);

  res.status(httpStatus.OK).send(event);
});

const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.id);

  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAll = catchAsync(async (req, res) => {
  await eventService.deleteAll();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  deleteAll,
};
