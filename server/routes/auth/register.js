const router = require('express').Router();
const registerController = require('../../controllers/authOperations/registerController');

const validateDto = require('../../middleware/validate-dto');
const devDto = require('../../dto/dev');
const { validateRegisterFields, validate } = require('../../middleware/validateAuthFields/validateAuthFields');

// router.post('/register', validateDto(devDto) ,registerController.handleRegister)
router.post('/register', validateRegisterFields, validate , registerController.handleRegister)
// router.route('/register')
    // .post(registerController.handleRegister);
    
module.exports = router;