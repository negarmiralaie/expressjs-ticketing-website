const sendSMS = require('./sendSMS');
const sendEmail = require('./sendEmail');

const sendEmailOrSms = async (method, identifier, text) => {
  if (method === 'email') return sendEmail(identifier, 'Verify your account', text);
  return sendSMS(identifier, text);
};

module.exports = sendEmailOrSms;
