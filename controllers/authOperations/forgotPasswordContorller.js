const createError = require('http-errors');
const UserService = require('../../services/user.service');
const sendResetPasswordLink = require('../../helpers/sendResetPasswordLink');

class ForgotPasswordController {
  handleForgotPassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { identifier } = req.body;

    try {
      const foundUser = await UserService.getUserByIdentifier(identifier);
      if (!foundUser) {
        res.status(400);
        throw createError.BadRequest('Unauthorized.');
      }

      const { id, password } = foundUser;
      const token = await sendResetPasswordLink(identifier, id, password);

      return res.status(200).json({
        data: { token, id },
        message: 'Password reset link has been sent to your phone number.',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ForgotPasswordController();
