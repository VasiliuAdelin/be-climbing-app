const mongoose = require("mongoose");
const config = require("./config/getEnv");
const app = require("./app");
const logger = require("./config/logger");

let server;
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info("Connected to DB");
    server = app.listen(config.port, () =>
      logger.info(`Listening at port ${config.port}`)
    );
  })
  .catch((err) => {
    logger.error(err);
    logger.info(`ERROR: Not enable to connect to DB`);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
