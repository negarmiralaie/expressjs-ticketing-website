const router = require('express').Router();
const forgotPasswordController = require('../controllers/forgotPasswordContorller');
const { validateForgotPasswordFields, validate } = require('../middleware/validateAuthFields/validateAuthFields');
// const ROLES_LIST = require("../config/roles_list");
// const verifyRoles = require("../middleware/verifyRoles");

router.post('/forgot-password', 
            // verifyRoles(ROLES_LIST.User),
            validateForgotPasswordFields, 
            validate , 
            forgotPasswordController.handleForgotPassword
)
    
module.exports = router;