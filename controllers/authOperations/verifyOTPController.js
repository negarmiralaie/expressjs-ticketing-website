const createError = require('http-errors');
const UserService = require('../../services/user.service');
const OtpService = require('../../services/otp.service');

class VerifyOTPController {
  verifyOTP = async (req, res, next) => { // eslint-disable-line
    try {
      const { verificationId, otp } = req.body;
      const userVerificationRecords = await OtpService.getOtpRecordById(verificationId);
      if (userVerificationRecords === null) return createError(404);

      // check if otp is correct:
      console.log('otp', otp);
      console.log('userVerificationRecords.otp', userVerificationRecords.otp);
      const isOtpCorrect = await OtpService.checkUserOtpAccuracy(verificationId, otp);
      if (!isOtpCorrect) throw createError(400, 'Entered code is not correct.');

      // If otp was correct, now check if it is not expired:
      const isOtpExpired = await OtpService.checkOtpExpiration(verificationId);
      if (isOtpExpired) return createError(400, 'Otp is expired.');

      // Now user is verified!!, find a user with verificationId and change its isVerified to true
      await UserService.updateUser(verificationId, { isVerified: true });

      return res.status(200).json('successfully verified');
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new VerifyOTPController();
