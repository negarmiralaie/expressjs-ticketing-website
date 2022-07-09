const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const connectDB = require('./config/db');
const createError = require("http-errors");
const swaggerDocs = require("./helpers/swagger");
// ! //////////////////// END OF IMPORTS //////////////////////

const PORT = process.env.PORT || 5000;

// &MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
};

// *Imports all of the routes from ./routes/index.js
const routes = require('./routes/index');
app.use(routes);

require('dotenv').config();

connectDB();

app.use(async(req, res, next)=>{
  next(createError.NotFound('This route does not exist'));
});

// swaggerDocs(app, PORT);

module.exports = app.listen(PORT);