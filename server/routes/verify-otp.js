const router = require('express').Router();
const verifyOTPController = require('../controllers/verifyOTPController');

router.route('/verify-otp')
    .post(verifyOTPController)

module.exports = router;