const ObjectId = require('mongodb').ObjectID;
const createError = require('http-errors');
const UserOTPVerification = require('../models/UserOTPVerification');

class OtpService {
  getOtpRecordById = async (otpRecordId) => { // eslint-disable-line class-methods-use-this
    try {
      return await UserOTPVerification.findOne({ _id: ObjectId(otpRecordId) });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  checkUserOtpAccuracy = async (otpRecordId, userEnteredOtp) => {
    try {
      const otpRecord = await this.getOtpRecordById(otpRecordId);
      console.log('otpRecord.otp', otpRecord.otp);
      if (otpRecord.otp !== userEnteredOtp) return false;
      return true;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  checkOtpExpiration = async (otpRecordId) => {
    try {
      const otpRecord = await this.getOtpRecordById(otpRecordId);
      const isOtpExpired = otpRecord.expiredAt < Date.now();
      if (isOtpExpired) {
        // otp is expired so we must delete it now
        this.deleteOtpRecord(otpRecordId);
        return isOtpExpired;
      }
      return false;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  deleteOtpRecord = async (otpRecordId) => { // eslint-disable-line class-methods-use-this
    try {
      return await UserOTPVerification.deleteOne({ _id: ObjectId(otpRecordId) });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };
}

module.exports = new OtpService();
