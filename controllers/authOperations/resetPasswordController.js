const createError = require('http-errors');
const UserService = require('../../services/user.service');

class ResetPasswordController {
  handleResetPassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { password, confirmPassword } = req.body;

    try {
      const { userId } = req;
      const user = await UserService.getUserById(userId);
      if (!user) {
        res.status(401);
        throw createError.BadRequest('Unauthorized');
      }

      // Validate password and confirmPassword should match
      if (password !== confirmPassword) {
        res.status(400);
        throw createError.BadRequest('Password mismatch');
      }

      UserService.updateUser(userId, { password });

      return res.json('Password has been reset!');
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ResetPasswordController();
