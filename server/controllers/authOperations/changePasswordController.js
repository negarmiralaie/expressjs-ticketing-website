const createError = require('http-errors');
const UserModel = require('../../models/User');

class ChangePasswordController {
  handleChangePassword = async (req, res, next) => {
    const {
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;

    try {
      // In verifyAccessToken middleware we got userId from accessToken and saved it in userId
      // equivalant to: const userId = req.userId
      const { userId } = this.req;
      const foundUser = await UserModel.findById(userId);
      // When we find foundUser using model.find method, we will get an array of objects so we can
      // get access to desired foundUser through foundUser[0]
      if (!foundUser) throw createError.NotFound('User with this phone number does not exist.');

      const isCurrentPasswordMatch = await foundUser.isValidPassword(currentPassword);

      if (isCurrentPasswordMatch) throw createError.Unauthorized('incorrect credentials');
      if (newPassword !== confirmNewPassword) throw createError.BadRequest('رمز با تکرار رمز برابر نیست.');
      await UserModel.findOneAndUpdate({
        userId,
      }, {
        password: newPassword,
      });
      return res.status(200).json('تغییر رمز موفقیت آمیز بود.');
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ChangePasswordController();
