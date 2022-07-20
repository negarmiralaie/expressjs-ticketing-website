const router = require('express').Router();
const changePasswordController = require('../../../controllers/authOperations/changePasswordController');
const verifyAccessToken = require('../../../middleware/verifyAccessToken');
const {
  validateChangePasswordFields,
  validate,
} = require('../../../middleware/validateFields/validateFields');

router.post(
  '/change-password',
  verifyAccessToken,
  validateChangePasswordFields,
  validate,
  changePasswordController.handleChangePassword,
);

module.exports = router;
