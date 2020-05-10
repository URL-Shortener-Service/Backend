const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authRoutes = require('./user')


const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to stackOverflow-clone');
});

module.exports = app;
