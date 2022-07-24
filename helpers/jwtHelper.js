const createError = require('http-errors');
const JWT = require('jsonwebtoken');
const client = require('../config/init_redis');
const UserService = require('../services/user.service');

module.exports = {
  signAccessToken: async (userId) => { // eslint-disable-line
    const role = await UserService.getUserRole(userId);
    return new Promise((resolve, reject) => {
      const payload = {
        userId,
        role,
      };
      console.log('payload', payload);
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '1h',
        issuer: 'http://localhost:5000',
      };
      // We can also put exp and iss in payoad but if we put them in both places we will get error
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError(err));
        }
        resolve(token);
      });
    });
  },
  signRefreshToken: async (userId) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      const payload = {
        userId,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1y',
        issuer: 'http://localhost:5000',
      };
      // We can also put exp and iss in payoad but if we put them in both places we will get error
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError(err));
        }
        client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => { // eslint-disable-line
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
          resolve(token);
        });
      });
    });
  },
  verifyRefreshToken: (refreshToken) => { // eslint-disable-line
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
  },
};
