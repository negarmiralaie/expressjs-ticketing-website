const createError = require('http-errors');
const UserModel = require('../../models/User');

class ChangePasswordController {
  handleChangePassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const {
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;

    try {
      // In verifyAccessToken middleware we got userId from accessToken and saved it in userId
      // equivalant to: const userId = req.userId
      const { userId } = req;
      const foundUser = await UserModel.findById(userId);
      // When we find foundUser using model.find method, we will get an array of objects so we can
      // get access to desired foundUser through foundUser[0]
      if (!foundUser) {
        res.status(400);
        throw createError.NotFound('User with this phone number does not exist.');
      }

      const isCurrentPasswordMatch = await foundUser.isValidPassword(currentPassword);

      if (!isCurrentPasswordMatch) {
        res.status(400);
        throw createError.Unauthorized('incorrect credentials');
      }
      if (newPassword !== confirmNewPassword) {
        res.status(400);
        throw createError.BadRequest('Password mismatch');
      }

      await UserModel.findOneAndUpdate({
        userId,
      }, {
        password: newPassword,
      });
      return res.status(200).json('Successfully changed password');
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ChangePasswordController();
