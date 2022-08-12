const { check } = require('express-validator');

exports.validateVerifyOTPFields = [
  check('verificationId')
    .trim()
    .notEmpty()
    .withMessage('verificationId is required'),
  check('otp')
    .trim()
    .notEmpty()
    .withMessage('Otp is required')
    .isLength(4)
    .withMessage('otp must contain 4 digits.'),
];
