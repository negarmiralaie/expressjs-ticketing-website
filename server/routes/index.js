const express = require('express');
const router = express.Router();

// Auth operations
router.use('/api/v1/auth', require('./auth/register'));
router.use('/api/v1/auth', require('./auth/verify-otp'));
router.use('/api/v1/auth', require('./auth/login'));
router.use('/api/v1/auth', require('./auth/logout'));
router.use('/api/v1/auth', require('./auth/forgot-password'));
router.use('/api/v1/auth', require('./auth/reset-password'));
router.use('/api/v1/auth', require('./auth/change-password'));

// Ticket operations
router.use('/api/v1/ticket', require('./user/create-ticket'));
router.use('/api/v1/ticket', require('./user/delete-ticket'));
router.use('/api/v1/ticket', require('./user/get-user-tickets'));
router.use('/api/v1/ticket', require('./user/filter-user-tickets'));

module.exports = router;