const createError = require('http-errors');
const { createJwtToken } = require('./jwtHelper');
const sendEmailOrSms = require('./sendEmailOrSms');

const PORT = process.env.PORT || 5000;

const sendResetPasswordLink = async (identifier, id, password) => {
  try {
    const secret = process.env.JWT_SECRET + password;
    const payload = { identifier, id };
    const options = { expiresIn: '1m' };
    const token = await createJwtToken(payload, secret, options);
    const method = identifier.includes('@') ? 'email' : 'phone';

    // Remember this link is valid once, otherwise it will give us "invalid signature password"!!
    const link = `https://localhost:${PORT}/reset-password/${id}/${token}`;
    console.log('link', link);

    await sendEmailOrSms(method, identifier, `Check out this link to reset your password: ${link}`);
    return token;
  } catch (err) {
    throw createError.InternalServerError();
  }
};

module.exports = sendResetPasswordLink;
