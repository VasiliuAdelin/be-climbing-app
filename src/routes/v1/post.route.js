const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { postValidation } = require("../../validations");
const { postController } = require("../../controllers");

router
  .route("/")
  .get(postController.getPosts)
  .delete(postController.deleteAll)
  .post(auth(), validate(postValidation.createPost), postController.createPost);

router
  .route("/:id")
  .get(validate(postValidation.getPost), postController.getPostById)
  .patch(auth(), validate(postValidation.updatePost), postController.updatePost)
  .delete(
    auth(),
    validate(postValidation.deletePost),
    postController.deletePost
  );

module.exports = router;
