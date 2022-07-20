const express = require('express');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const connectDB = require('./config/db');
const routes = require('./routes/index');
// ! //////////////////// END OF IMPORTS //////////////////////

const app = express();
const swaggerJSDocs = YAML.load('./api.yaml');
require('./config/init_redis');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// &MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cookieparser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// *Imports all of the routes from ./routes/index.js
app.use(routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

connectDB();

app.use(async (req, res, next) => {
  next(createError.NotFound('This route does not exist'));
});

module.exports = app.listen(PORT);
