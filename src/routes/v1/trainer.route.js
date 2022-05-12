const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { trainerValidation } = require("../../validations");
const { trainerController } = require("../../controllers");

router
  .route("/")
  .get(validate(trainerValidation.getTrainers), trainerController.getTrainers)
  .delete(trainerController.deleteAll)
  .post(
    auth(),
    validate(trainerValidation.createTrainer),
    trainerController.createTrainer
  );

router
  .route("/:id")
  .get(validate(trainerValidation.getTrainer), trainerController.getTrainerById)
  .patch(
    auth(),
    validate(trainerValidation.updateTrainer),
    trainerController.updateTrainer
  )
  .delete(
    auth(),
    validate(trainerValidation.deleteTrainer),
    trainerController.deleteTrainer
  );

module.exports = router;
