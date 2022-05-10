const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const { eventValidation } = require("../../validations");
const { eventController } = require("../../controllers");

router
  .route("/")
  .get(validate(eventValidation.getEvents), eventController.getEvents)
  .delete(eventController.deleteAll)
  .post(
    auth(),
    validate(eventValidation.createEvent),
    eventController.createEvent
  );

router
  .route("/:id")
  .get(validate(eventValidation.getEvent), eventController.getEventById)
  .patch(
    auth(),
    validate(eventValidation.updateEvent),
    eventController.updateEvent
  )
  .delete(
    auth(),
    validate(eventValidation.deleteEvent),
    eventController.deleteEvent
  );

module.exports = router;
