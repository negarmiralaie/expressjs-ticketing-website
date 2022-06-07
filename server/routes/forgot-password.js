const router = require('express').Router();
const forgotPasswordController = require('../controllers/forgotPasswordContorller');

router.route('/forgot-password')
    .post(forgotPasswordController.handleForgotPassword)

module.exports = router;