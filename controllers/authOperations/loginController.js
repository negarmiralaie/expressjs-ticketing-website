const createError = require('http-errors');
const UserModel = require('../../models/User');
const {
  signAccessToken,
  signRefreshToken,
} = require('../../helpers/jwtHelper');

class LoginHandler {
  handleLogin = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const {
      identifier,
      password,
    } = req.body;

    const foundUser = await UserModel.findOne({
      identifier,
    });

    try {
      if (foundUser === null) {
        res.status(400);
        throw createError.NotFound('This user does not exist.');
      }

      const isPasswordMatch = await foundUser.isValidPassword(password);
      if (!isPasswordMatch) {
        res.status(400);
        throw createError.Unauthorized('Phone number or password is incorrect.');
      }

      const accessToken = await signAccessToken(foundUser.id);
      const refreshToken = await signRefreshToken(foundUser.id);
      console.log('refreshToken', refreshToken);

      // store token in cookie
      // cookie is automatically sent with every request
      // httpOnly cookie is not available to javascript so it is safe
      res.cookie('access-token', accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const userId = foundUser.id;
      console.log('userId', userId);
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
