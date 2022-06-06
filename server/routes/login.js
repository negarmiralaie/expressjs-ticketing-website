const router = require('express').Router();
const loginController = require('../controllers/loginController');

router.route('/login')
    .post(loginController.handleLogin)

module.exports = router;