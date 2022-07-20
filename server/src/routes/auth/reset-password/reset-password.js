const router = require('express').Router();
const resetPasswordController = require('../../../controllers/authOperations/resetPasswordController');

const {
  validateResetPasswordFields,
  validate,
} = require('../../../middleware/validateFields/validateFields');

router.post(
  '/reset-password',
  validateResetPasswordFields,
  validate,
  resetPasswordController.handleResetPassword,
);

module.exports = router;
