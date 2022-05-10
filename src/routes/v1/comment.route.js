const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { commentValidation } = require("../../validations");
const { commentController } = require("../../controllers");

router
  .route("/")
  .get(commentController.getComments)
  .delete(commentController.deleteAll) // TODO: remove this. only for testing
  .post(auth(), validate(commentValidation.createComment), commentController.createComment);

router
  .route("/:id")
  .get(validate(commentValidation.getComment), commentController.getCommentById)
  .patch(auth(), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(
    auth(),
    validate(commentValidation.deleteComment),
    commentController.deleteComment
  );

module.exports = router;
