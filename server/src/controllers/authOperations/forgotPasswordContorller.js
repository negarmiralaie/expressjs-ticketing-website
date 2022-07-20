const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');
const sendSMS = require('../../helpers/sendSMS');

const PORT = process.env.PORT || 5000;

class ForgotPasswordController {
  handleForgotPassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const {
      phoneNumber,
    } = req.body;

    try {
      const foundUser = await UserModel.findOne({
        phoneNumber,
      });

      if (!foundUser) {
        res.status(400);
        throw createError.BadRequest('Unauthorized.');
      }

      const secret = process.env.JWT_SECRET + foundUser.password;
      const payload = {
        email: foundUser.email,
        id: foundUser.id,
      };

      const token = jwt.sign(payload, secret, {
        expiresIn: '1m',
      });

      // Remember this link is valid once, otherwise it will give us "invalid signature password"!!
      const link = `https://localhost:${PORT}/reset-password/${foundUser.id}/${token}`;
      console.log('link', link);

      await sendSMS(phoneNumber, `
         Check out this link to reset your password: ${link}
      `);

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
