const createError = require('http-errors');
const UserOTPVerification = require('../../models/UserOTPVerification');
const UserModel = require('../../models/User');

class VerifyOTPController {
  verifyOTP = async (req, res, next) => { // eslint-disable-line
    try {
      const {
        verificationId,
        otp,
      } = req.body;

      if (!otp || !verificationId) {
        res.status(400);
        throw createError.BadRequest();
      }

      const userVerificationRecords = await UserOTPVerification.findOne({
        _id: verificationId,
      }).exec();

      if (!userVerificationRecords || userVerificationRecords.length <= 0) {
        res.status(401);
        throw createError.BadRequest('User is either not registered or is already verified.');
      }

      // check if otp is correct:
      // console.log('otp', otp);
      // console.log('userVerificationRecords.otp', userVerificationRecords.otp);
      if (userVerificationRecords.otp !== otp) {
        res.status(400);
        throw createError.BadRequest('Entered code is not correct.');
      }

      // If otp was correct, now check if it is not expired:
      if (userVerificationRecords.expiredAt < Date.now()) {
        // delete user records
        UserOTPVerification.deleteOne({
          _id: verificationId,
        }).exec();
        res.status(400);
        throw createError.BadRequest('Code is expired.');
      }

      // Now user is verified!!
      // find a user with verificationId and change its isVerified to true
      await UserModel.findOneAndUpdate({
        verificationId,
      }, {
        isVerified: true,
      });

      return res.status(200).json('successfully verified');
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new VerifyOTPController();
