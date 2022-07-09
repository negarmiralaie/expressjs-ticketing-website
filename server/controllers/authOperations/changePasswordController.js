const UserModel = require('../../models/User');
const ObjectId = require('mongodb').ObjectID;
const createError = require("http-errors");

class changePasswordController {
    handleChangePassword = async (req, res, next) => {
        const {
            currentPassword,
            newPassword,
            confirmNewPassword
        } = req.body;

        try {
            // In verifyAccessToken middleware we got userId from accessToken and saved it in userId so here we have access to userId
            const userId = req.userId;
            let foundUser = await UserModel.find({
                "_id": ObjectId(userId)
            });
            // When we find foundUser using model.find method, we will get an array of objects so we can get access to desired foundUser through foundUser[0]
            foundUser = foundUser[0];
            if (!foundUser) throw createError.NotFound(`User with phone number ${phoneNumber} does not exist.`);

            const isCurrentPasswordMatch = await foundUser.isValidPassword(currentPassword);

            if (isCurrentPasswordMatch) throw createError.Unauthorized("incorrect credentials");
            if (newPassword !== confirmNewPassword) throw createError.BadRequest("رمز با تکرار رمز برابر نیست.")
            await UserModel.findOneAndUpdate({
                userId
            }, {
                "password": newPassword
            });

            return res.status(200).json("تغییر رمز موفقیت آمیز بود.")

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new changePasswordController();