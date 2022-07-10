const express = require('express');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const createError = require('http-errors');
const connectDB = require('./config/db');
const routes = require('./routes/index');
// ! //////////////////// END OF IMPORTS //////////////////////

const app = express();
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

connectDB();

app.use(async (req, res, next) => {
  next(createError.NotFound('This route does not exist'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
