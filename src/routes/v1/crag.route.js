const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { cragValidation } = require("../../validations");
const { cragController } = require("../../controllers");

router
  .route("/")
  .get(validate(cragValidation.getCrags), cragController.getCrags)
  .delete(cragController.deleteAll)
  .post(auth(), validate(cragValidation.createCrag), cragController.createCrag);

router
  .route("/:id")
  .get(validate(cragValidation.getCrag), cragController.getCragById)
  .patch(auth(), validate(cragValidation.updateCrag), cragController.updateCrag)
  .delete(
    auth(),
    validate(cragValidation.deleteCrag),
    cragController.deleteCrag
  );

module.exports = router;
