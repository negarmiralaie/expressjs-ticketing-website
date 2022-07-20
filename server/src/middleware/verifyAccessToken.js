const JWT = require('jsonwebtoken');
const createError = require('http-errors');

const verifyAccessToken = (req, res, next) => { // eslint-disable-line
  if (!req.cookies) return next(createError.Unauthorized());
  const { cookies } = req;
  const accessToken = cookies['access-token'];
  if (!accessToken) return next(createError.Unauthorized());
  JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => { // eslint-disable-line
    if (err) {
      console.log('err', err);
      const errorMessage = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
      return next(createError.Unauthorized(errorMessage));
    }
    req.userId = payload.userId;
    next();
  });
};

module.exports = verifyAccessToken;
