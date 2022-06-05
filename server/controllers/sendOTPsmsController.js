const sendOTPsms = require('../helpers/sendOTPsms');
const UserOTPVerification = require("../models/UserOTPVerification");

class sendOTPController {
    sendSms = async (req, res) => {
    
        try{
            const otp = await sendOTPsms();
    
            // Now store otp in db
            const userOTPVerification = await new UserOTPVerification({ 
                userId: req.user._id,
                otp,
                createdAt: Date.now(),
                expiredAt: Date.now() + (2 * 60 * 1000)
            }).save();
        } 
        catch(err){
            console.log('err', err)
        }
    }
}

module.exports = new sendOTPController();