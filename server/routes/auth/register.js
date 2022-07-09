const router = require('express').Router();
const RegisterController = require('../../controllers/authOperations/RegisterController');

const {
  validateRegisterFields,
  validate,
} = require('../../middleware/validateAuthFields/validateAuthFields');

router.post('/register', validateRegisterFields, validate, RegisterController.handleRegister);

module.exports = router;
