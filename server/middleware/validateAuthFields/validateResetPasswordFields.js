const {
    check
} = require('express-validator');

exports.validateResetPasswordFields = [
    check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({
        min: 8
    })
    .withMessage("Password must be at least 8 characters long"),
    check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({
        min: 8
    })
    .withMessage("Password must be at least 8 characters long")
];