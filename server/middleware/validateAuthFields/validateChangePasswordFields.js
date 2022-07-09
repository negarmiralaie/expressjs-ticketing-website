const {
  check,
} = require('express-validator');

exports.validateChangePasswordFields = [
  check('currentPasword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({
      min: 8,
    })
    .withMessage('Password must be at least 8 characters long'),
  check('newPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('New password is required')
    .bail()
    .isLength({
      min: 8,
    })
    .withMessage('Password must be at least 8 characters long'),
  check('confirmNewPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Confirm new password is required')
    .bail()
    .isLength({
      min: 8,
    })
    .withMessage('Password must be at least 8 characters long'),

];
