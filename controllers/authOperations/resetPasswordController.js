const createError = require('http-errors');
const JWT = require('jsonwebtoken');
const hashPassword = require('../../helpers/hashPassword');
const UserService = require('../../services/user.service');

class ResetPasswordController {
  handleResetPassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { password, confirmPassword } = req.body;
    const { cookies } = req;
    const token = cookies['forgot-password-token'];
    const userId = JWT.decode(token).id;

    try {
      const user = await UserService.getUserById(userId);
      if (!user) throw createError.BadRequest(404, 'User not found');

      // Validate password and confirmPassword should match
      if (password !== confirmPassword) throw createError(400, 'Password mismatch');
      const hashedPassword = await hashPassword(password);
      UserService.updateUser(userId, { password: hashedPassword });
      return res.json('Password has been reset!');
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ResetPasswordController();
