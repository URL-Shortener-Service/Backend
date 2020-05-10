const express = require("express");
const passport = require("passport");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const logger = require("morgan");
const authRoutes = require("./user");
const { authCallbackStrategy } = require('../SocialStrategy/googleStrategy');

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    models.User.findById(id)
      .then(user => {
        done(null, user.id);
      })
      .catch(err => console.log(err));
  });
  
  authCallbackStrategy();

app.use("/", authRoutes);

module.exports = app;
