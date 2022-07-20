const {
  check,
} = require('express-validator');

exports.validateCreateTickerFields = [
  check('title')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .escape()
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage('Title must be between 3 and 20 characters'),
  check('description')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .escape()
    .withMessage('description is required')
    .isLength({
      min: 3,
    })
    .withMessage('Description must contain at least 3characters'),
];
