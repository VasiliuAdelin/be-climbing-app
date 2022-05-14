const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { topicValidation } = require("../../validations");
const { topicController } = require("../../controllers");

router
  .route("/")
  .get(validate(topicValidation.getTopics), topicController.getTopics)
  .delete(topicController.deleteAll)
  .post(
    auth(),
    validate(topicValidation.createTopic),
    topicController.createTopic
  );

router
  .route("/distinct")
  .get(topicController.getTopicsDistinct);

router
  .route("/:id")
  .get(validate(topicValidation.getTopic), topicController.getTopicById)
  .patch(
    auth(),
    validate(topicValidation.updateTopic),
    topicController.updateTopic
  )
  .delete(
    auth(),
    validate(topicValidation.deleteTopic),
    topicController.deleteTopic
  );

module.exports = router;
