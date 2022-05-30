const express = require('express');
const router = express.Router();

// const loginRequired = require('../middlewares/loginRequired');

// router.get('/', (router, res) => {
//     // res.send('Hello World!');
//     res.render('index');
// });

const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);

router.get('/', (req, res) => {
    res.render('step1');
});

router.post('/step2', (req, res) => {
  const number = req.body.number

  console.log('number', number)

  messagebird.verify.create(number, {
      template:"Your verification code is %token"
  }, function (err, response) {
          if (err) {
              console.log("1");
              console.log(err)
              res.render('step1', {
                  err
              })
          }
          else {
              console.log("2");
              console.log(response)
              res.render('step2', {
                  id:response.id
              })
          }
  })
})

router.post('/step3', (req, res) => {
  var id = req.body.id
  var token = req.body.token

  messagebird.verify.verify(id, token, (err, response) => {
      if (err) {
          res.render('step2', {
              error: err.errors[0].description,
              id:id
          })
      }
      else {
          res.render('step3')
      }
  })
})


router.use('/api/v1/auth', require('./register'));
// router.use('/api/v1/auth', require('./send-sms'));

module.exports = router;