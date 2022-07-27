const createError = require('http-errors');
const JWT = require('jsonwebtoken');
const client = require('../config/init_redis');
const UserService = require('../services/user.service');

const createJwtToken = async (payload, secret, options) => {
  try {
    return await JWT.sign(payload, secret, options);
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const storeRefreshTokenInRedis = async (userId, token) => {
  await client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => { // eslint-disable-line
    if (err) {
      console.log(err.message);
      throw createError.InternalServerError();
    }
  });
};

const signAccessToken = async (userId) => { // eslint-disable-line
  const role = await UserService.getUserRole(userId);
  const payload = { userId, role };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const options = { expiresIn: '1h', issuer: 'http://localhost:5000' };

  return createJwtToken(payload, secret, options);
};

const signRefreshToken = async (userId) => { // eslint-disable-line
  const payload = { userId };
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const options = { expiresIn: '1y', issuer: 'http://localhost:5000' };
  const token = await createJwtToken(payload, secret, options);
  await storeRefreshTokenInRedis(userId, token);
  return token;
};

const verifyRefreshToken = (refreshToken) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        console.log(err.message);
        reject(createError.Unauthorized());
      }
      const { userId } = payload;

      client.GET(userId, (err, result) => { // eslint-disable-line
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        console.log('Stored refresh token:', result);

        if (refreshToken === result) resolve(userId);
        reject(createError.Unauthorized());
      });
    });
  });
};

module.exports = {
  createJwtToken, signAccessToken, signRefreshToken, verifyRefreshToken,
};
