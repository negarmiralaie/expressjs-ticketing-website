const router = require('express').Router();
const registerController = require('../controllers/registerController');
const validateDto = require('../middleware/validate-dto');
const devDto = require('../dto/dev');

// router.post('register' ,registerController)
// router.post('register', validateDto(devDto) ,registerController.handleRegister)
router.route('/register')
    .post(registerController)
    // .get(registerController.getRegister);
module.exports = router;