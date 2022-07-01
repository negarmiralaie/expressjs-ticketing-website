const UserModel = require('../../models/User');
const sendSMS = require('../../helpers/sendSMS');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 5000;

class forgotPasswordController{
    handleForgotPassword = async (req, res) => {
        const { phoneNumber } = req.body;

        const foundUser = await UserModel.findOne({ phoneNumber });
        if (!foundUser) return res.status(400).json('No user with that phone number exists!!');
        
        const secret = process.env.JWT_SECRET + foundUser.password;
        const payload = {
            email: foundUser.email,
            id: foundUser.id,
        }

        const token = jwt.sign(payload, secret, {expiresIn: '1m'});

        // Remember that this link is valid only once, otherwise it will give us "invalid signature password"!!
        const link = `https://localhost:${PORT}/reset-password/${foundUser.id}/${token}`;
        console.log('link', link);

        const isOTPSent = await sendSMS(`
            Check out this link to reset your password: ${link}
        `);

        const id = foundUser.id;
        return res.status(200).json({ data:{token, id} ,message: "لینک با موفقیت برای شما ارسال شد."});
    }
}

module.exports = new forgotPasswordController();