const express = require('express');
const router = express.Router();

// const loginRequired = require('../middlewares/loginRequired');

router.use('/api/v1/auth', require('./register'));
// router.use('/api/v1/auth', require('./verify-otp'));

module.exports = router;