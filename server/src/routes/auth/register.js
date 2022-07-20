const router = require('express').Router();
const RegisterController = require('../../controllers/authOperations/registerController');

const {
  validateRegisterFields,
  validate,
} = require('../../middleware/validateFields/validateFields');

router.post('/register', validateRegisterFields, validate, RegisterController.handleRegister);

module.exports = router;
