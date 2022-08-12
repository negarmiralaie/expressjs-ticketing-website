const createError = require('http-errors');
const UserService = require('../../services/user.service');
const OtpService = require('../../services/otp.service');
const {
  signAccessToken,
  signRefreshToken,
} = require('../../helpers/jwtHelper');

class LoginHandler {
  handleLogin = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { identifier, password } = req.body;
    const foundUser = await UserService.getUserByIdentifier(identifier);

    try {
      if (foundUser === null) throw createError(404, 'This user does not exist.');
      const isUserVerified = foundUser.isVerified;
      if (!isUserVerified) {
        // If user is not verified, check his verification records,if is expired, it will be deleted
        const isOtpExpired = await OtpService.checkOtpExpiration(foundUser.verificationId);
        if (isOtpExpired) throw createError(401, 'User is not verified.');
        throw createError(401, 'Verification is not completed.');
      }

      const isPasswordMatch = await foundUser.isValidPassword(password);
      if (!isPasswordMatch) throw createError(400, 'Phone number or password is incorrect.');

      const userId = foundUser.id;
      const accessToken = await signAccessToken(userId);
      const refreshToken = await signRefreshToken(userId);

      // store token in cookie,  cookie is automatically sent with every request
      // httpOnly cookie is not available to javascript so it is safe
      res.cookie('access-token', accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json({
        data: {
          accessToken,
          refreshToken,
          userId,
        },
        message: 'logged in successfully',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new LoginHandler();
