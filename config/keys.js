require('dotenv').config();

module.exports = {
  TEST_DB: process.env.TEST_DB,
  DATA_DB: process.env.MONGODB_URI,
  JWTSecret: process.env.JWT_Secret,
  USER_MAIL: process.env.USER_MAIL,
  PASSWORD_MAIL: process.env.PASSWORD_MAIL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  FRONTEND: process.env.FRONT_END,
};