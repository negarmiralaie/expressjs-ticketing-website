const UserModel = require('../../models/User');
const ObjectId = require('mongodb').ObjectID;
const createError = require("http-errors");

class resetPasswordController {
    handleResetPassword = async (req, res, next) => {
        const {
            password,
            confirmPassword
        } = req.body;

        try {
            const userId = req.userId;
            const user = await UserModel.find({
                "_id": ObjectId(userId)
            });
            if (!user) throw createError.BadRequest("کاربر موجود نمیباشد.")

            // Validate password and confirmPassword should match
            if (password !== confirmPassword) throw createError.BadRequest("رمز با تکرار آن برابر نیست.")
            await UserModel.updateOne({
                password
            });
            res.json("Password has been reset!");

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new resetPasswordController();