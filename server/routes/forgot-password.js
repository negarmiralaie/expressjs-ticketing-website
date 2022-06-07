const router = require('express').Router();
const forgotPasswordController = require('../controllers/forgotPasswordContorller');
const { validateForgotPasswordFields, validate } = require('../middleware/validateAuthFields/validateAuthFields');

router.post('/login', validateForgotPasswordFields, validate , forgotPasswordController.handleForgotPassword)
    
module.exports = router;