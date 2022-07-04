const router = require('express').Router();
const registerController = require('../../controllers/authOperations/registerController');

const {
    validateRegisterFields,
    validate
} = require('../../middleware/validateAuthFields/validateAuthFields');

router.post('/register', validateRegisterFields, validate, registerController.handleRegister)

module.exports = router;