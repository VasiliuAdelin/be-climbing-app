const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { commentService, cragService } = require("../services");

const createCrag = catchAsync(async (req, res) => {
  const crag = await cragService.createCrag(req.body);

  res.status(httpStatus.CREATED).send(crag);
});

const getCrags = catchAsync(async (req, res) => {
  const filter = _.pick(req.query, [
    "name",
    "city",
    "country",
    "isHidden",
    "isValidated",
    "author",
  ]);
  const options = _.pick(req.query, ["sortBy", "limit", "page"]);

  let crags = await cragService.getCrags(filter, options);

  res.status(httpStatus.OK).send(crags);
});

const getCragById = catchAsync(async (req, res) => {
  const crag = await cragService.getCragById(req.params.id);
  if (!crag) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Crag not found",
    ]);
  }

  const {
    __v,
    _id,
    name,
    grade,
    type,
    city,
    country,
    address,
    description,
    geoLocation,
    author,
    assets,
    isValidated,
    isHidden,
    features,
    likes,
    ascents,
    interested,
    rating,
  } = crag;

  const comments = await commentService.getCommentByEntityId(crag.id);
  
  const payload = {
    id: _id,
    name,
    grade,
    type,
    city,
    country,
    address,
    description,
    geoLocation,
    author,
    assets,
    isValidated,
    isHidden,
    features,
    likes,
    ascents,
    interested,
    rating,
    comments
  }

  res.status(httpStatus.OK).send(payload);
});

const updateCrag = catchAsync(async (req, res) => {
  const crag = await cragService.updateCragById(req.params.id, req.body);

  res.status(httpStatus.OK).send(crag);
});

const deleteCrag = catchAsync(async (req, res) => {
  await cragService.deleteCragById(req.params.id);

  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAll = catchAsync(async (req, res) => {
  await cragService.deleteAll();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCrag,
  getCrags,
  getCragById,
  updateCrag,
  deleteCrag,
  deleteAll,
};
