const express = require('express');

const router = express.Router();

// Auth operations
router.use('/api/v1/auth', require('./auth/register/register'));
router.use('/api/v1/auth', require('./auth/verify-otp/verify-otp'));
router.use('/api/v1/auth', require('./auth/login/login'));
router.use('/api/v1/auth', require('./auth/logout/logout'));
router.use('/api/v1/auth', require('./auth/forgot-password/forgot-password'));
router.use('/api/v1/auth', require('./auth/reset-password/reset-password'));
router.use('/api/v1/auth', require('./auth/change-password/change-password'));
router.use('/api/v1/auth', require('./auth/refresh-token/refresh-token'));

// Ticket operations
router.use('/api/v1/user', require('./user/create-ticket'));
router.use('/api/v1/user', require('./user/delete-ticket'));
router.use('/api/v1/user', require('./user/get-user-tickets'));
router.use('/api/v1/user', require('./user/filter-user-tickets'));

// Admin operations
router.use('/api/v1/admin', require('./admin/post-ticket-answer'));

router.get('/', (req, res) => {
  res.send('Ticketing website home page');
});

module.exports = router;
