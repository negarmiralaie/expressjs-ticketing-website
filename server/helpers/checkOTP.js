const UserOTPVerification = require("../../models/UserOTPVerification");

const verifyOtp = (req, res) =>{
    try{
        const { userId, otp } = req.body;
        if(!userId || !otp) return res.status(400).json({ message: 'Invalid request' });
        else{
            const userOTPverificationRecord = UserOTPVerification.find({userId});
            if(userOTPverificationRecord.length <= 0){
                // no record found
            }
        }
    }
    catch(err){

    }
}