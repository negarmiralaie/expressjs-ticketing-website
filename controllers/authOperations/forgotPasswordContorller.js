const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');
const sendEmailOrSms = require('../../helpers/sendEmailOrSms');

const PORT = process.env.PORT || 5000;

class ForgotPasswordController {
  handleForgotPassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const {
      identifier,
    } = req.body;

    const method = identifier.includes('@') ? 'email' : 'phone';

    try {
      const foundUser = await UserModel.findOne({
        identifier,
      });

      if (!foundUser) {
        res.status(400);
        throw createError.BadRequest('Unauthorized.');
      }

      const secret = process.env.JWT_SECRET + foundUser.password;
      const payload = {
        identifier: foundUser.identifier,
        id: foundUser.id,
      };

      const token = jwt.sign(payload, secret, {
        expiresIn: '1m',
      });

      // Remember this link is valid once, otherwise it will give us "invalid signature password"!!
      const link = `https://localhost:${PORT}/reset-password/${foundUser.id}/${token}`;
      console.log('link', link);

      await sendEmailOrSms(method, identifier, `Check out this link to reset your password: ${link}`);

      const { id } = foundUser;
      return res.status(200).json({
        data: {
          token,
          id,
        },
        message: 'Password reset link has been sent to your phone number.',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ForgotPasswordController();
