const router = require('express').Router();
const loginController = require('../../../controllers/authOperations/loginController');

const {
  validateLoginFields,
  validate,
} = require('../../../middleware/validateFields/validateFields');

router.post('/login', validateLoginFields, validate, loginController.handleLogin);

module.exports = router;
