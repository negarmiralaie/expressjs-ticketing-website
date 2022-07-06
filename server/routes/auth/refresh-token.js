const router = require('express').Router();
const refreshTokenController = require('../../controllers/authOperations/refreshTokenController');

// const {
//     validateLoginFields,
//     validate
// } = require('../../middleware/validateAuthFields/validateAuthFields');

router.post('/refresh-token',
                // validateLoginFields,
                // validate, 
                refreshTokenController.handleRefreshToken);

module.exports = router;