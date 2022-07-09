const router = require('express').Router();
const changePasswordController = require('../../controllers/authOperations/changePasswordController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
// const {
// validateChangePasswordFields,
// validate,
// } = require('../../middleware/validateAuthFields/validateChangePasswordFields');

router.post(
  '/change-password',
  // validateChangePasswordFields, 
  // validate , 
  verifyAccessToken,
  changePasswordController.handleChangePassword,
);

module.exports = router;
