const UserOTPVerification = require("../models/UserOTPVerification");

const verifyOTPController = async (req, res) =>{
    try{
        const { userId, otp } = req.body;

        if(!otp || !userId) return res.status(400).json("Invalid request");

        const userVerificationRecords = await UserOTPVerification.findOne({ _id : userId }).exec();
       
        if( userVerificationRecords.length <= 0 ) return res.status(404).json("Account record doesn't exist or has been verified already.")
        
        // check if otp is correct:
        if (userVerificationRecords.otp !== otp) return res.status(401).json("The code you entered is incorrect!");

        // If otp was correct, now check if it is not expired:
        if(userVerificationRecords.expiredAt < Date.now()) {
            // delete user records
            UserOTPVerification.deleteOne({_id: userId}).exec();

            return res.status(403).json("Code has been expired. Please request again");
        }

        // Now user is verified!!
        // User.updateOne( userId, {isVerified: true});

        return res.status(200) //Authorized
    }
    catch(err){

    }
}

module.exports = verifyOTPController;

// class verifyOTPController{
    // verifyOTP = async (req, res) => {
        // try{
        //     console.log(1)
        //     // const { userId, otp } = req.body;
        //     // console.log('userId', userId);
        //     // console.log('otp', otp)

        //     // if(!otp || !userId) return res.status(400).json("Invalid request");

        //     // const ObjectId = require('mongodb').ObjectID;

        //     // const userVerificationRecords = await UserOTPVerification.find({ "_id" : ObjectId(userId) }).exec();
        //     // const userVerificationRecordId = userVerificationRecords[0]._id.toString();
        //     // console.log('userVerificationRecords', userVerificationRecords);
        //     // if( userVerificationRecords.length <= 0 ) return res.status(404).json("Account record doesn't exist or has been verified already.")
            
        //     // check if otp is correct:
        //     // if (userVerificationRecords.otp !== otp) return res.status(401);

        //     // If otp was correct, now check if it is not expired:
        //     // if(userVerificationRecords.expiredAt < Date.now()) {
        //         // delete user records
        //         // userVerificationRecords.deleteMany({ userId });
        //         // return res.status(403).json("Code has been expired. Please request again");
        //     // }

        //     // Now user is verified!!
        //     // User.updateOne( userId, {isVerified: true});

        //     return res.status(200) //Authorized
        // }
        // catch(err){

        // }
    // }
// }

// module.exports = new verifyOTPController();