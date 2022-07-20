const ObjectId = require('mongodb').ObjectID;
const createError = require('http-errors');
const UserModel = require('../../models/User');

class ResetPasswordController {
  handleResetPassword = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const {
      password,
      confirmPassword,
    } = req.body;

    try {
      const { userId } = req;
      const user = await UserModel.find({
        _id: ObjectId(userId),
      });
      if (!user) {
        res.status(401);
        throw createError.BadRequest('Unauthorized');
      }

      // Validate password and confirmPassword should match
      if (password !== confirmPassword) {
        res.status(400);
        throw createError.BadRequest('Password mismatch');
      }

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
