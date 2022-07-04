// const router = require('express').Router();
// const resetPasswordController = require('../controllers/resetPasswordController');
// // const { validateResetPasswordFields, validate } = require('../middleware/validateAuthFields/validateAuthFields');
// const { validateResetPasswordFields, validate } = require('../middleware/validateAuthFields/validateAuthFields');

// // router.route('/reset-password/:id/:token')
//     // .post(resetPasswordController.handleResetPassword)

// router.post('/reset-password/:id/:token', validate , resetPasswordController.handleResetPassword)


// module.exports = router;

const router = require('express').Router();
const resetPasswordController = require('../../controllers/authOperations/resetPasswordController');
const verifyAccessToken = require("../../middleware/verifyAccessToken");

const {
    validateResetPasswordFields,
    validate
} = require('../../middleware/validateAuthFields/validateAuthFields');

router.post('/reset-password/:id/:token',
    verifyAccessToken,
    validateResetPasswordFields,
    validate,
    resetPasswordController.handleResetPassword)

module.exports = router;