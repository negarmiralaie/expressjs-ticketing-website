const router = require('express').Router();
const registerController = require('../controllers/registerController');
const validateDto = require('../middleware/validate-dto');
const devDto = require('../dto/dev');

// router.post('/register',registerController.handleRegister)
router.post('/register', validateDto(devDto) ,registerController.handleRegister)
// router.route('/register')
    // .post(registerController.handleRegister);
    
module.exports = router;