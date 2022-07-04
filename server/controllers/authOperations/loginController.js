const UserModel = require('../../models/User');
const { signAccessToken } = require("../../helpers/jwtHelper");
const createError = require("http-errors");

class loginHandler{
    handleLogin = async (req, res, next) => {
        let { phoneNumber, password } = req.body;
        
        try{
            const foundUser = await UserModel.findOne({phoneNumber});
            if (!foundUser) throw createError.NotFound(`User with phone number ${phoneNumber} does not exist.`);

            const isPasswordMatch = await foundUser.isValidPassword(password);
            if (!isPasswordMatch) throw createError.Unauthorized("Phone number or password is incorrect.");

            const accessToken = await signAccessToken(foundUser.id)

            // store token in cookie
            // cookie is automatically sent with every request
            // httpOnly cookie is not available to javascript so it is safe
            res.cookie('access-token', accessToken, {
                 maxAge: 24 * 60 * 60 * 1000,
                 httpOnly: true
            });
            
            const userId = foundUser.id
            console.log('userId', userId);
            res.status(200).json({ data: {accessToken, userId}, message: "logged in successfully" });
    
        } catch (error){
            next(error)
        }       
    }
}

module.exports = new loginHandler();