const router = require('express').Router();
const verifyOTPController = require('../../controllers/authOperations/verifyOTPController');

router.route('/verify-otp')
  .post(verifyOTPController.verifyOTP);

module.exports = router;
