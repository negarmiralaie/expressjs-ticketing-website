const { check, validationResult } = require('express-validator');

exports.validateForgotPasswordFields = [
    check("phoneNumber")
        .trim()
        .isLength(11)
        .bail()
        .isMobilePhone()
];