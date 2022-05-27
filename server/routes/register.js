const router = require('express').Router();
const registerController = require('../controllers/registerController');

router.route('/register')
    .post(registerController.handleRegister)
    .get(registerController.getRegister);

module.exports = router;