const UserOTPVerification = require('../models/UserOTPVerification');
const bcrypt = require('bcrypt');
const sendMail = require('../helpers/sendMail');

const sendOTPVerificationMail = async (id, email) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        // Hash the otp
        const hashedOTP = await bcrypt.hash(otp, 10);
        await sendMail(email, "Verification Email", `Thanks for registering! Enter this code: ${otp}`);
        return true;
    } catch (error) {
        console.log('error', error);
        return false;
    }
}

module.exports = sendOTPVerificationMail;