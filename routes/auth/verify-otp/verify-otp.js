const router = require('express').Router();
const verifyOTPController = require('../../../controllers/authOperations/verifyOTPController');
const {
  validateVerifyOTPFields,
  validate,
} = require('../../../middleware/validateFields/validateFields');

router.route('/verify-otp')
  .post(
    validateVerifyOTPFields,
    validate,
    verifyOTPController.verifyOTP,
  );

module.exports = router;
