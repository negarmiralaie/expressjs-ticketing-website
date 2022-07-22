const {
  check,
  oneOf,
} = require('express-validator');

exports.validateForgotPasswordFields = [
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
];
