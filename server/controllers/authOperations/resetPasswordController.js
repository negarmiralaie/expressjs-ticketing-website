const ObjectId = require('mongodb').ObjectID;
const createError = require('http-errors');
const UserModel = require('../../models/User');

class ResetPasswordController {
    handleResetPassword = async (req, res, next) => {
    const {
      password,
      confirmPassword,
    } = req.body;

    try {
      const { userId } = req;
      const user = await UserModel.find({
        _id: ObjectId(userId),
      });
      if (!user) throw createError.BadRequest('کاربر موجود نمیباشد.');

      // Validate password and confirmPassword should match
      if (password !== confirmPassword) throw createError.BadRequest('رمز با تکرار آن برابر نیست.');
      await UserModel.updateOne({
        password,
      });
      return res.json('Password has been reset!');
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ResetPasswordController();
