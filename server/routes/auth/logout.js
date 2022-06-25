const router = require('express').Router();
const logoutController = require('../../controllers/authOperations/logoutController');

router.get('/logout', logoutController.handlelogout)
    
module.exports = router;