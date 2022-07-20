const router = require('express').Router();
const refreshTokenController = require('../../../controllers/authOperations/refreshTokenController');

router.post(
  '/refresh-token',
  refreshTokenController.handleRefreshToken,
);

module.exports = router;
