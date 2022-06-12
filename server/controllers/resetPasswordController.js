const {User} = require('../models/User');
const jwt = require('jsonwebtoken');

class resetPasswordController{
    handleResetPassword = async (req, res) => {
        const { id, token } = req.params;
        const { password, confirmPassword } = req.body;
        const user = await User.findOne({id});
        if (!user) return res.status(400).json({ message: "user does not exist" });

        // const secret = process.env.JWT_SECRET + user.password;
        try{
            // const payload = jwt.verify(token, secret, payload);
            // Validate password and confirmPassword should match
            console.log("5")
            if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });
            // If we reach here, it means token is successfully verified, otherwised it will directly go to catch block
            // console.log(payload);
            // Payload as we created it, cintains email and id, and finally update with new password
            await User.updateOne({ password });
            res.json("Password has been reset!");
    
        } catch (err){
            // console.log('err.message', err.message);
            res.json(err.message);
        }
    }
}

module.exports = new resetPasswordController();