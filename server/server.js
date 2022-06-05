const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const crypto = require('crypto');
const cookieparser = require('cookie-parser');
const createError = require('http-errors');
const connectDB = require('./config/db');

// ! //////////////////// END OF IMPORTS //////////////////////

const PORT = process.env.PORT || 5000;

// &MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
};

// &VIEW ENGINE
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.engine('ejs', require('ejs').__express);

// *Imports all of the routes from ./routes/index.js
const routes = require('./routes/index');
app.use(routes);

require('dotenv').config();

connectDB();

app.use(async (req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error:{
      status: err.status || 500,
      message: err.message,
    }
  })
})

// &VIEW ENGINE
const { engine } = require('express-handlebars');

app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views');
app.engine('handlebars', engine({defaultLayout: "main"}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});