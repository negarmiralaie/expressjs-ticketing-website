const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const connectDB = require('./config/db');
const createError = require("http-errors");
require('./config/init_redis');
require('dotenv').config();

// ! //////////////////// END OF IMPORTS //////////////////////

const PORT = process.env.PORT || 5000;


// client.connect().then(() => {
//   client.SET('foo', 'bar')
//   .then(() => {
//     client.GET('foo', (err, value) => {
//       if (err) console.log(err);
//       console.log(value);
//     })
//   })
// })

// const redisFunc = async () =>{
//   await client.connect();
//   await client.SET('foo', 'bar');
//   await client.GET('foo', (err, value) => {
//     if (err) console.log(err);
//     console.log(value);
//   })
// }

// redisFunc();

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

connectDB();

app.use(async(req, res, next)=>{
  next(createError.NotFound('This route does not exist'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

