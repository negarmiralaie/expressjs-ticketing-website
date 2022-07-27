const createError = require('http-errors');
const UserService = require('../../services/user.service');
const hashPassword = require('../../helpers/hashPassword');

class ChangePasswordController {
  handleChangePassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    try {
      // In verifyAccessToken middleware we got userId from accessToken and saved it in userId
      const { userId } = req;
      const foundUser = await UserService.getUserById(userId);
      // When we find foundUser using model.find method, we will get an array of objects so we can
      const isCurrentPasswordMatch = await foundUser.isValidPassword(currentPassword);

      if (!isCurrentPasswordMatch) throw createError(400, 'incorrect credentials');
      if (newPassword !== confirmNewPassword) throw createError(400, 'Password mismatch');

      const hashedPassword = await hashPassword(newPassword);
      await UserService.updateUser(userId, { password: hashedPassword });
      return res.status(200).json('Successfully changed password');
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ChangePasswordController();
