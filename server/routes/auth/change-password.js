const router = require('express').Router();
const changePasswordController = require('../../controllers/authOperations/changePasswordController');

const { validateChangePasswordFields, validate } = require('../../middleware/validateAuthFields/validateChangePasswordFields');


router.post('/change-password', 
            // validateChangePasswordFields, 
            // validate , 
            changePasswordController.handleChangePassword
)
    
module.exports = router;