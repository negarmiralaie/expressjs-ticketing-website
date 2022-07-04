const UserModel = require('../../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectID;
const createError = require("http-errors");

class changePasswordController{
    handleChangePassword = async (req, res, next) => {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        try{
            // In verifyAccessToken middleware we got userId from accessToken and saved it in userId so here we have access to userId
            const userId = req.userId;
            const foundUser = await UserModel.find({"_id": ObjectId(userId)});
            if (!foundUser) throw createError.NotFound(`User with phone number ${phoneNumber} does not exist.`);

            const isCurrentPasswordMatch = await bcrypt.compare(currentPassword ,foundUser[0].password);
            // const password = foundUser[0].password;
            // const isCurrentPasswordMatch =  await foundUser.isValidPassword(password);

            if( isCurrentPasswordMatch ) throw createError.Unauthorized("incorrect credentials");
            if( newPassword !== confirmNewPassword ) throw createError.BadRequest("رمز با تکرار رمز برابر نیست.")
            await UserModel.findOneAndUpdate({ userId }, { "password": newPassword });

            return res.status(200).json("تغییر رمز موفقیت آمیز بود.")
            
        } catch(error){
            next(error);
        }
    }
}

module.exports = new changePasswordController();