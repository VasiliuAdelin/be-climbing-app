const router = require("express").Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const commentRoute = require("./comment.route");
const eventRoute = require("./event.route");
const cragRoute = require("./crag.route");
const trainerRoute = require("./trainer.route");
const topicRoute = require("./topic.route");
const docsRoute = require("./docs.route");
const config = require("../../config/getEnv");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/posts",
    route: postRoute,
  },
  {
    path: "/comments",
    route: commentRoute,
  },
  {
    path: "/events",
    route: eventRoute,
  },
  {
    path: "/crags",
    route: cragRoute,
  },
  {
    path: "/trainers",
    route: trainerRoute,
  },
  {
    path: "/topics",
    route: topicRoute,
  },
];

const developmentRoutes = [
  {
    path: "/docs",
    route: docsRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

if (config.env === "development") {
  developmentRoutes.forEach(({ path, route }) => {
    router.use(path, route);
  });
}

module.exports = router;
