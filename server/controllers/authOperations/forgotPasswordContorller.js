const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');
const sendSMS = require('../../helpers/sendSMS');

const PORT = process.env.PORT || 5000;

class ForgotPasswordController {
  handleForgotPassword = async (req, res, next) => {
    const {
      phoneNumber,
    } = this.req.body;

    try {
      const foundUser = await UserModel.findOne({
        phoneNumber,
      });
      if (!foundUser) throw createError.BadRequest('کاربری با این شماره تلفن ثبت نشده است.');

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
        message: 'لینک با موفقیت برای شما ارسال شد.',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ForgotPasswordController();
