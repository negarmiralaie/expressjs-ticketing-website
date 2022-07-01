const UserModel = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require("http-errors");

const createAccessToken = (id) =>{
    return jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '120s' });
}

class loginHandler{
    handleLogin = async (req, res, next) => {
        let { phoneNumber, password } = req.body;
        
        const foundUser = await UserModel.findOne({phoneNumber});
        // if (!foundUser) return res.status(401).json({ message: "user does not exist" }); //Unauthorized
        if (!foundUser) throw createError.BadRequest("کاربر موجود نمیباشد.")

        try{
            // If we reach here, it means token is successfully verified, otherwised it will directly go to catch block
            const match = await bcrypt.compare(password ,foundUser.password);
            // if(!match) return res.status(401).json({ message: "password does not match"})
            if(!match) throw createError.BadRequest("اطلاعات صحیح نمیباشند.")

            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // const roles = Object.values(foundUser.roles);
            // now create tokens
            const accessToken = createAccessToken(foundUser.id);
            // const refreshToken = createRefreshToken(foundUser.id);

            const userId = foundUser.id

            // store token in cookie
            // cookie is automatically sent with every request
            // httpOnly cookie is not available to javascript so it is safe
            res.cookie('access-token', accessToken, {
                 maxAge: 24 * 60 * 60 * 1000,
                 httpOnly: true
            });
            
            console.log('id', userId);
            res.status(200).json({ data: {accessToken, userId}, message: "logged in successfully" });
    
        } catch (error){
            next(error)
            // res.status(400).json(err.message);
        }       
    }
}

module.exports = new loginHandler();