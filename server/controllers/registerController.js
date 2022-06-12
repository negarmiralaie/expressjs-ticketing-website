const { User } = require('../models/User');
const UserOTPVerification = require('../models/UserOTPVerification');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendSMS = require('../helpers/sendSMS');

class registerController{
    async handleRegister(req, res){
        const { name, familyName, phoneNumber, password } = req.body;
        console.log('User', User)

        // check for duplicate usernames in the db
        const duplicateUser = await User.findOne({ phoneNumber }).exec();
        if (duplicateUser) return res.status(409).json({ 
            message: "User already exists! Login Instead" 
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
            const user = await User.create({
                name,
                familyName,
                phoneNumber,
                password,
                "verificationId" : userOTPRecord.id
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
                    .status(400)
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