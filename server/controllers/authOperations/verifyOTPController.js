const createError = require('http-errors');
const UserOTPVerification = require('../../models/UserOTPVerification');
const UserModel = require('../../models/User');

class VerifyOTPController {
    verifyOTP = async (req, res, next) => {
    try {
      const {
        verificationId,
        otp,
      } = req.body;

      if (!otp || !verificationId) throw createError.BadRequest();
      const userVerificationRecords = await UserOTPVerification.findOne({
        _id: verificationId,
      }).exec();

      if (userVerificationRecords.length <= 0) throw createError.BadRequest('کاربر ثبت نشده یا قبلا احراز هویت شده است.');
      // check if otp is correct:
      console.log('otp', otp);
      console.log('userVerificationRecords.otp', userVerificationRecords.otp);
      if (userVerificationRecords.otp !== otp) throw createError.BadRequest('کد وارد شده صحیح نیست.');
      // If otp was correct, now check if it is not expired:
      if (userVerificationRecords.expiredAt < Date.now()) {
        // delete user records
        UserOTPVerification.deleteOne({
          _id: verificationId,
        }).exec();
        throw createError.BadRequest('کد منقضی شده است لطفا دوباره درخواست دهید.');
      }

      // Now user is verified!!
      // find a user with verificationId and change its isVerified to true
      await UserModel.findOneAndUpdate({
        verificationId,
      }, {
        isVerified: true,
      });

      return res.status(200).json('با موفقیت احراز هویت شدید.'); //Authorized
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new VerifyOTPController();
