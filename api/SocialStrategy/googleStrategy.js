const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const models = require("../../models");
const keys = require("../../config/keys");

module.exports = {
  authCallbackStrategy() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: keys.GOOGLE_CLIENT_ID,
          clientSecret: keys.GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
          passReqToCallback: true
        },
        function(_, __, ___, profile, cb) {
          models.User.findOne({ email: profile.emails[0].value })
            .then(existingUser => {
              if (existingUser) {
                return cb(null, existingUser);
              }
              return models.User.create({
                email: profile.emails[0].value,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                auth_id: profile.id
              });
            })
            .then(newUser => cb(null, newUser))

            .catch(err => console.log(err));
        }
      )
    );
  }
};
