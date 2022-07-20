const {
  validationResult,
} = require('express-validator');
const {
  validateRegisterFields,
} = require('./validateRegisterFields');
const {
  validateLoginFields,
} = require('./validateLoginFields');
const {
  validateForgotPasswordFields,
} = require('./validateForgotPasswordFields');
const {
  validateResetPasswordFields,
} = require('./validateResetPasswordFields');
const {
  validateChangePasswordFields,
} = require('./validateChangePasswordFields');
const {
  validateCreateTickerFields,
} = require('./validateCreateTickerFields');

const validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  return res.status(400).json({
    success: false,
    error: error[0].msg,
  });
};

module.exports = {
  validateRegisterFields,
  validateLoginFields,
  validateForgotPasswordFields,
  validateResetPasswordFields,
  validateCreateTickerFields,
  validateChangePasswordFields,
  validate,
};
