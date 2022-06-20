const {User, validate} = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class changePasswordController{
    handleChangePassword = async (req, res) => {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        try{
            const cookies = req.cookies;
            if (!cookies?.jwt) return res.status(401).json("توکن موجود نمیباشد.");  

            const jwtToken = cookies.jwt;
            const userId = jwt.decode(jwtToken).id;
            const foundUser =await User.findOne({ userId });

            const isCurrentPasswordMatch = await bcrypt.compare(currentPassword ,foundUser.password);
            
            if( isCurrentPasswordMatch ) return res.status(401).json("رمز وارد شده صحیح نیست.")
            if( newPassword !== confirmNewPassword ) return res.status(400).json("پسورد جدید با تکرار آن برابر نیست.")

            // await User.updateOne({ "password": newPassword });
            await User.findOneAndUpdate({ userId }, { "password": newPassword });


        } catch(err){
            return res.status(500).send({ message: "خطای سرور" });
        }
    }
}

module.exports = new changePasswordController();