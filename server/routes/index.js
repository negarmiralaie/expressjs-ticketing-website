const express = require('express');
const router = express.Router();
// const loginRequired = require('../middlewares/loginRequired');

// router.get('/', (router, res) => {
//     // res.send('Hello World!');
//     res.render('index');
// });

router.use('/api/v1/auth', require('./register'));


module.exports = router;