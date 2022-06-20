const UserOTPVerification = require("../models/UserOTPVerification");
const { User } = require('../models/User');

class verifyOTPController{
    verifyOTP = async (req, res) => {
        try{
            const { verificationId, otp } = req.body;
    
            if(!otp || !verificationId) return res.status(400).json("درخواست نادرست.");
            
            const userVerificationRecords = await UserOTPVerification.findOne({ _id : verificationId }).exec();
            
            if( userVerificationRecords.length <= 0 ) return res.status(404).json("کاربر ثبت نشده و یا قبلا احراز هویت شده است.")
            // check if otp is correct:
            console.log('otp', otp);
            console.log('userVerificationRecords.otp', userVerificationRecords.otp)
            if (userVerificationRecords.otp !== otp) return res.status(401).json("کد وارد شده صحیح نمیباشد.");
            
            // If otp was correct, now check if it is not expired:
            if(userVerificationRecords.expiredAt < Date.now()) {
                // delete user records
                UserOTPVerification.deleteOne({_id: verificationId}).exec();
    
                return res.status(403).json("کد منقظی شده است. لطفا دوباره درخواست دهید.");
            }
    
            // Now user is verified!!
            
            // find a user with verificationId and change its isVerified to true
            await User.findOneAndUpdate({verificationId}, {"isVerified": true});
    
            return res.status(200).json("با موفقیت احراز هویت شدید.") //Authorized
        }
        catch(err){
            return res.status(500).json("خطای سرور");
        }
    }
}

module.exports = new verifyOTPController();