const UserModel = require('../../models/User');
const UserOTPVerification = require("../../models/UserOTPVerification");
const sendSMS = require('../../helpers/sendSMS');

class registerController{
    async handleRegister(req, res){
        const { name, familyName, phoneNumber, password } = req.body;

        // check for duplicate usernames in the db
        const duplicateUser = await UserModel.findOne({ phoneNumber }).exec();
        if (duplicateUser) return res.status(409).json({ 
            message: "شماره تلفن قبلا ثبت شده است." 
        }); //Conflict 
    
        // If everything was okay and phoneNumber wasnt already in the db
        try {
            // Crete OTP
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    
            // Store OTP in OTP db
            const userOTPRecord = await UserOTPVerification.create({ 
                otp,
                "createdAt": Date.now(),
                "expiredAt": Date.now() + 60 * 1000
            })
    
            console.log('otp', otp);
    
            // Now create and store the user in the db
            const user = await UserModel.create({
                name,
                familyName,
                phoneNumber,
                password,
                "verificationId" : userOTPRecord.id,
            });
    
            console.log('user.verificationId', user.verificationId)
    
            // Now send verification SMS
            const isOTPSent = await sendSMS(`
                This is your verification code: ${otp}, Remember it expires in 1 minute!
            `);
    
            const verificationId = userOTPRecord.id;
            if (isOTPSent) {
                console.log('otp', otp);
                console.log('verificationId', verificationId);
    
                return res
                    .status(201)
                    .send({ message: "کد احراز هویت برای شما پیامک شد.", data: { verificationId } });
            } else {
                return res.status(500).send({ message: "خطای سرور" });
            }
        } catch (error) {
            return res.status(500).json({
                'message': error.message
            });
        }
    }

}

module.exports = new registerController();