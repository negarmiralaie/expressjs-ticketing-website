const UserOTPVerification = require("../models/UserOTPVerification");
const { User } = require('../models/User');

class verifyOTPController{
    verifyOTP = async (req, res) => {
        try{
            // console.log(User)
            const { verificationId, otp } = req.body;
    
            if(!otp || !verificationId) return res.status(400).json("Invalid request");
            
            const userVerificationRecords = await UserOTPVerification.findOne({ _id : verificationId }).exec();
            
            if( userVerificationRecords.length <= 0 ) return res.status(404).json("Account record doesn't exist or has been verified already.")
            // check if otp is correct:
            console.log('otp', otp);
            console.log('userVerificationRecords.otp', userVerificationRecords.otp)
            if (userVerificationRecords.otp !== otp) return res.status(401).json("The code you entered is incorrect!");
            
            // If otp was correct, now check if it is not expired:
            if(userVerificationRecords.expiredAt < Date.now()) {
                // delete user records
                UserOTPVerification.deleteOne({_id: verificationId}).exec();
    
                return res.status(403).json("Code has been expired. Please request again");
            }
    
            // Now user is verified!!
            
            // find a user with verificationId and change its isVerified to true
            await User.findOneAndUpdate({verificationId}, {"isVerified": true});
    
            return res.status(200).json("Successfully authorized.") //Authorized
        }
        catch(err){
    
        }
    }
}

module.exports = new verifyOTPController();