const router = require("express").Router();
const authController = require("../../controllers/auth.controller");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const auth = require("../../middlewares/auth");

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.get("/me", auth(), authController.aboutMe);

router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

module.exports = router;
