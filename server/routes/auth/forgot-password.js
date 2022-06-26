const router = require('express').Router();
const forgotPasswordController = require('../../controllers/authOperations/forgotPasswordContorller');

const { validateForgotPasswordFields, validate } = require('../../middleware/validateAuthFields/validateAuthFields');

router.post('/forgot-password', 
            validateForgotPasswordFields, 
            validate , 
            forgotPasswordController.handleForgotPassword
)
    
module.exports = router;