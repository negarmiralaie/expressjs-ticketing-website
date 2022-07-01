const UserModel = require('../../models/User');
const ObjectId = require('mongodb').ObjectID;
const createError = require("http-errors");

class resetPasswordController{
    handleResetPassword = async (req, res, next) => {
        const { id, token } = req.params;
        const { password, confirmPassword } = req.body;

        try{
            const user = await UserModel.find({"_id": ObjectId(id)})
            // if (!user) return res.status(400).json({ message: "user does not exist" });
            if (!user) throw createError.BadRequest("کاربر موجود نمیباشد.")
            
            // Validate password and confirmPassword should match
            // if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });
            if (password !== confirmPassword) throw createError.BadRequest("رمز با تکرار آن برابر نیست.")
            // If we reach here, it means token is successfully verified, otherwised it will directly go to catch block
            // Payload as we created it, cintains email and id, and finally update with new password
            await UserModel.updateOne({ password });
            res.json("Password has been reset!");
    
        } catch (error){
            next(error)
            // console.log('err.message', err.message);
            // res.json(err.message);
        }
    }
}

module.exports = new resetPasswordController();