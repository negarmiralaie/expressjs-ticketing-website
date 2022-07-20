const createError = require('http-errors');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../../helpers/jwtHelper');

class RefreshTokenController {
  handleRefreshToken = async (req, res, next) => { // eslint-disable-line
    try {
      const refreshToken = req.body;
      if (!refreshToken.refreshToken) {
        res.status(400);
        throw createError.BadRequest();
      }
      const userId = await verifyRefreshToken(refreshToken.refreshToken);
      // If user's refreshToken was valid we should create a new accesToken and a new refreshToken
      const accessToken = await signAccessToken(userId);
      const newRefreshToken = await signRefreshToken(userId);

      return res.json({
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new RefreshTokenController();