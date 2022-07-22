const sendEmailOrSms = require('./sendEmailOrSms');
const UserOTPVerification = require('../models/UserOTPVerification');

const sendOTP = async (method, identifier) => {
  // Crete OTP
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  console.log('otp', otp);

  // Store OTP in OTP db
  const userOTPRecord = await UserOTPVerification.create({
    otp,
    createdAt: Date.now(),
    expiredAt: Date.now() + 60 * 1000,
  });

  const text = `This is your verification code: ${otp}, Notice that it expires in ${process.env.OTP_TTL} seconds!`;
  await sendEmailOrSms(method, identifier, text);
  return userOTPRecord.id;
};

module.exports = sendOTP;
