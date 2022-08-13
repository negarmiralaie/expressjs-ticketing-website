const createError = require('http-errors');
const UserModel = require('../../models/User');
const UserService = require('../../services/user.service');
const sendOTP = require('../../helpers/sendOTP');
const getIdentifierMethod = require('../../helpers/getIdentifierMethod');
const {
  signAccessToken,
  signRefreshToken,
} = require('../../helpers/jwtHelper');

class RegisterController {
  async handleRegister(req, res, next) { // eslint-disable-line
    const {
      name, familyName, identifier, password,
    } = req.body;

    const method = getIdentifierMethod(identifier);

    // check for duplicate usernames in the db
    const duplicateUser = await UserService.getUserByIdentifier(identifier);
    if (duplicateUser !== null) return createError(409, 'User already exists');
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
            data: {
              verificationId,
              accessToken,
              refreshToken,
            },
            message: 'OTP sent successfully',
          });
      }
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new RegisterController();
