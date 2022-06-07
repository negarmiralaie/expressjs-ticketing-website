const express = require('express');
const router = express.Router();
const devDto = require('../dto/dev');
// const vallidateDto = require('../middleware/validate-dto');

// const loginRequired = require('../middlewares/loginRequired');

router.use('/api/v1/auth', require('./register'));
router.use('/api/v1/auth', require('./verify-otp'));
router.use('/api/v1/auth', require('./login'));
router.use('/api/v1/auth', require('./forgot-password'));


module.exports = router;