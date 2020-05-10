const express = require('express');
const passport = require("passport");
const controller = require('../controllers/user');
const userValidators = require('../validation/userValidation');
const SocialStrategy = require('../controllers/Oauth')

const router = express.Router();
router.use(passport.initialize());

router.post(
  '/register',
  [userValidators.validateUserOnSignup],
  controller.createUser
);

router.post('/login', [userValidators.loginCredentials], controller.loginUser);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  SocialStrategy.socialAuthlogin
);


module.exports = router;