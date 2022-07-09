const router = require('express').Router();
const resetPasswordController = require('../../controllers/authOperations/resetPasswordController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

const {
  validateResetPasswordFields,
  validate,
} = require('../../middleware/validateAuthFields/validateAuthFields');

router.post(
  '/reset-password',
  verifyAccessToken,
  validateResetPasswordFields,
  validate,
  resetPasswordController.handleResetPassword);

module.exports = router;
