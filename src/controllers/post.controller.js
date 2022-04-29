const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { postService, userService, commentService } = require("../services");

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.body);

  res.status(httpStatus.CREATED).send(post);
});

const formatPostsResults = async (posts) => {
  let results = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const {
      __v,
      _id,
      author,
      assets,
      description,
      geoLocation,
      isHidden,
      isValidated,
      location,
      title,
      createdAt,
      updatedAt,
      likes
    } = post;

    const comments = await commentService.getCommentByEntityId(_id);
    const payload = {
      id: _id,
      author,
      assets,
      description,
      geoLocation,
      isHidden,
      isValidated,
      location,
      title,
      createdAt,
      updatedAt,
      comments,
      likes
    }
    results.push(payload)
  }

  return results;
};


const getPosts = catchAsync(async (req, res) => {
  const filter = _.pick(req.query, [
    "title",
    "descripton",
    "isHidden",
    "isValidated",
  ]);
  const options = _.pick(req.query, ["sortBy", "limit", "page"]);

  let posts = await postService.getPosts(filter, options);

  posts.results = await formatPostsResults(posts.results);
  
  res.status(httpStatus.OK).send(posts);
});

const getPostById = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Post not found",
    ]);
  }
  const {
    __v,
    _id,
    author,
    assets,
    description,
    geoLocation,
    isHidden,
    isValidated,
    location,
    title,
    createdAt,
    updatedAt,
    likes
  } = post;
  const comments = await commentService.getCommentByEntityId(post.id);
  
  const payload = {
    id: _id,
    author,
    assets,
    description,
    geoLocation,
    isHidden,
    isValidated,
    location,
    title,
    createdAt,
    updatedAt,
    comments,
    likes
  }
  res.status(httpStatus.OK).send(payload);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updatePostById(req.params.id, req.body);

  res.status(httpStatus.OK).send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req.params.id);

  res.status(httpStatus.NO_CONTENT).send();
});

const deleteAll = catchAsync(async (req, res) => {
  await postService.deleteAll();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  deleteAll,
};
