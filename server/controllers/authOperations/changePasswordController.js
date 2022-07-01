const UserModel = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectID;
const createError = require("http-errors");

class changePasswordController{
    handleChangePassword = async (req, res, next) => {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        try{
            const cookies = req.cookies;
            // if (!cookies?.jwt) return res.status(401).json("توکن موجود نمیباشد.");  
            if (!cookies?.jwt) throw createError.BadRequest('توکن موجود نمیباشد.');

            const jwtToken = cookies.jwt;
            const userId = jwt.decode(jwtToken).id;
            let foundUser = await UserModel.find({"_id": ObjectId(userId)})

            const isCurrentPasswordMatch = await bcrypt.compare(currentPassword ,foundUser[0].password);
            
            if( isCurrentPasswordMatch ) return res.status(401).json("رمز وارد شده صحیح نیست.")
            // if( newPassword !== confirmNewPassword ) return res.status(400).json("پسورد جدید با تکرار آن برابر نیست.")
            if( newPassword !== confirmNewPassword ) throw createError.BadRequest("رمز با تکرار رمز برابر نیست.")
            await UserModel.findOneAndUpdate({ userId }, { "password": newPassword });

            return res.status(200).json("تغییر رمز موفقیت آمیز بود.")
            
        } catch(error){
            next(error);
            // return res.status(500).send({ message: "خطای سرور" });
        }
    }
}

module.exports = new changePasswordController();