const express = require('express');
const router = express.Router();
const devDto = require('../dto/dev');
// const loginRequired = require('../middlewares/loginRequired');

// Auth operations
router.use('/api/v1/auth', require('./register'));
router.use('/api/v1/auth', require('./verify-otp'));
router.use('/api/v1/auth', require('./login'));
router.use('/api/v1/auth', require('./forgot-password'));
router.use('/api/v1/auth', require('./reset-password'));

// Ticket operations
router.use('/api/v1/ticket', require('./user/create-ticket'));
router.use('/api/v1/ticket', require('./user/get-user-tickets'));

module.exports = router;