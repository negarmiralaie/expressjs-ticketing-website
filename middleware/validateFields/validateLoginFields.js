const {
  check,
  oneOf,
} = require('express-validator');

exports.validateLoginFields = [
  oneOf([
    check('identifier')
      .trim()
      .isLength(11)
      .bail()
      .isMobilePhone(),
    check('identifier')
      .trim()
      .notEmpty()
      .bail()
      .escape()
      .isEmail()
      .withMessage('Email is invalid'),
  ]),
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
