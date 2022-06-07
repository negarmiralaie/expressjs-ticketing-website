const { check, validationResult } = require('express-validator');
const {validateRegisterFields} = require('./validateRegisterFields');
const {validateLoginFields} = require('./validateLoginFields');
const {validateForgotPasswordFields} = require('./validateForgotPasswordFields');
const {validateResetPasswordFields} = require('./validateResetPasswordFields');

const validate = (req, res, next) => {
    const error = validationResult(req).array();
    if(!error.length) return next();

    res.status(400).json({success: false, error: error[0].msg});
}

module.exports = {
    validateRegisterFields,
    validateLoginFields,
    validateForgotPasswordFields,
    validateResetPasswordFields,
    validate};