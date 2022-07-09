const router = require('express').Router();
const logoutController = require('../../controllers/authOperations/logoutController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/logout', verifyAccessToken, logoutController.handlelogout);

module.exports = router;
