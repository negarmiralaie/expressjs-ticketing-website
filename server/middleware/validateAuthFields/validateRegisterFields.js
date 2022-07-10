const {
  check,
} = require('express-validator');

exports.validateRegisterFields = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .escape()
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage('Name must be between 3 and 20 characters'),
  check('familyName')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .escape()
    .withMessage('Name is required')
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage('Name must be between 3 and 20 characters'),
  check('phoneNumber')
    .trim()
    .isLength(11)
    .bail()
    .isMobilePhone(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({
      min: 8,
    })
    .withMessage('Password must be at least 8 characters long'),
];
