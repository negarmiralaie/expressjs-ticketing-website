const createError = require('http-errors');
const UserModel = require('../../models/User');
const sendResetPasswordLink = require('../../helpers/sendResetPasswordLink');

class ForgotPasswordController {
  handleForgotPassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { identifier } = req.body;

    try {
      const foundUser = await UserModel.findOne({ identifier });
      if (!foundUser) throw createError(400);

      const { id, password } = foundUser;
      const token = await sendResetPasswordLink(identifier, id, password);

      return res.status(200).json({
        data: { token, id },
        message: 'Password reset link has been sent',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ForgotPasswordController();
