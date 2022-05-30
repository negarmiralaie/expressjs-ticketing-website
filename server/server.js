const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const crypto = require('crypto');
const cookieparser = require('cookie-parser');
// const nodemailer = require('nodemailer');
const createError = require('http-errors');
const connectDB = require('./config/db');

////////////////////// END OF IMPORTS //////////////////////

const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
};

// VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').__express);

// Imports all of the routes from ./routes/index.js
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

// const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);

let responseId;
let responseToken;

// VIEW ENGINE
const { engine } = require('express-handlebars');

app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views');
app.engine('handlebars', engine({defaultLayout: "main"}));

// app.post('/step2', (req, res) => {
//   var number = req.body.number

//   messagebird.verify.create(number, {
//       template:"Your verification code is %token"
//   }, function (err, response) {
//           if (err) {
//               console.log(err)
//               res.render('step1', {
//                   error:err.errors[0].description
//               })
//           }
//           else {
//               console.log(response)
//               res.render('step2', {
//                   id:response.id
//               })
//           }
//   })
// })

// app.post('/step3', (req, res) => {
//   var id = req.body.id
//   var token = req.body.token

//   messagebird.verify.verify(id, token, (err, response) => {
//       if (err) {
//           res.render('step2', {
//               error: err.errors[0].description,
//               id:id
//           })
//       }
//       else {
//           res.render('step3')
//       }
//   })
// })

// app.get('/sms', (req, res) => {
//  res.render('send-sms');
//  res.send("hh")
//  console.log("sms")
// })

// app.post('/sms', (req, res) =>{
//   const number = "+989229798602";

//   messagebird.verify.create(number, {
//     template: 'Your verification code is %token%',
//   }, (err, response) => {
//     if (err) {
//       console.log("third")
//       console.log(err);
//       res.send(err);
//     } else {
//       console.log("fourth")
//       console.log(response);
//       responseId = response.id;
//       responseToken = responseToken;
//       console.log('responseId', responseId)
//       console.log('responseToken', responseToken)
//       res.send(response);
//     }
//   })
// })


app.post('/step2', (req, res) =>{
  messagebird.verify.verify(responseId, responseToken, (err, response)=>{
    if(err){
      console.log(`first`)
      console.log(err);
      res.send(err);
    } else {
      console.log("second")
      console.log(response);
      res.send(response);
    }
  })
  })


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});