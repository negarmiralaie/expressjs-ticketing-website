const createError = require('http-errors');
const UserModel = require('../../models/User');
const sendOTP = require('../../helpers/sendOTP');
const {
  signAccessToken,
  signRefreshToken,
} = require('../../helpers/jwtHelper');

class RegisterController {
  async handleRegister(req, res, next) { // eslint-disable-line
    const {
      name,
      familyName,
      identifier,
      password,
    } = req.body;

    const method = identifier.indexOf('@') > -1 ? 'email' : 'phoneNumber';

    // check for duplicate usernames in the db
    const duplicateUser = await UserModel.findOne({
      identifier,
    }).exec();

    if (duplicateUser) {
      res.status(409);
      throw createError.Conflict();
    }

    // If everything was okay and user wasnt already in the db
    try {
      const verificationId = await sendOTP(method, identifier);
      console.log('verificationId', verificationId);

      // Now create and store the user in the db
      const role = 'user';
      const user = await UserModel.create({
        name,
        familyName,
        method,
        identifier,
        password,
        verificationId,
        role,
      });

      const userId = user._id.toString(); // eslint-disable-line no-underscore-dangle
      const accessToken = await signAccessToken(userId);
      const refreshToken = await signRefreshToken(userId);

      if (verificationId) {
        return res
          .status(201)
          .send({
            message: 'OTP sent successfully',
            data: {
              verificationId,
              accessToken,
              refreshToken,
            },
          });
      }
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new RegisterController();
