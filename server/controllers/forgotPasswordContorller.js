const {User, validate} = require('../models/User');
const sendSMS = require('../helpers/sendSMS');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 5000;

class forgotPasswordController{
    handleForgotPassword = async (req, res) => {
        const { error } = validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
    
        const { phoneNumber } = req.body;

        const foundUser = await User.findOne({ phoneNumber });
        if (!foundUser) return res.status(400).json('No user with that phone number exists!!');
    
        // Now user with given email exists so we should create a one tmie link that is valid for 10 mins
    
        const secret = process.env.JWT_SECRET + foundUser.password;
        const payload = {
            email: foundUser.email,
            id: foundUser.id,
        }
        const token = jwt.sign(payload, secret, {expiresIn: '10m'});

        // Remember that this link is valid only once, otherwise it will give us "invalid signature password"!!
        // ???whatt???
        const link = `https://localhost:${PORT}/reset-password/${foundUser.id}/${token}`;
        console.log('link', link);

        const isOTPSent = await sendSMS(`
            Check out this link to reset your password: ${link}
        `);

        const id = foundUser.id;
        return res.json("Reset link has been sent to your phone!", token, id);    
    }
}

module.exports = new forgotPasswordController();