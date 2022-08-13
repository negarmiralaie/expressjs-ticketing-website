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
      .isMobilePhone()
      .withMessage('Identifier is invalid'),
    check('identifier')
      .trim()
      .notEmpty()
      .bail()
      .escape()
      .isEmail()
      .withMessage('Identifier is invalid'),
  ]),
];
