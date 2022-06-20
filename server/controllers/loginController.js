const {User, validate} = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');

const createAccessToken = (id, roles) =>{
    return jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '120s' });
}

// Refresh token doesn't need to get roles bc it is only there to verify that you can create new access token
// const createRefreshToken = (id) =>{
//     return jwt.sign(
//         { id },
//         process.env.REFRESH_TOKEN_SECRET, 
//         { expiresIn: '1d' });
// }

class loginHandler{
    handleLogin = async (req, res) => {
        let { phoneNumber, password } = req.body;
        
        const foundUser = await User.findOne({phoneNumber});
        if (!foundUser) return res.status(401).json({ message: "user does not exist" }); //Unauthorized
    
        // const secret = process.env.JWT_SECRET + user.password;
        try{
            // const payload = jwt.verify(token, secret);
            // If we reach here, it means token is successfully verified, otherwised it will directly go to catch block
            const match = await bcrypt.compare(password ,foundUser.password);
            if(!match) return res.status(401).json({ message: "password does not match"})
            
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            const roles = Object.values(foundUser.roles);
            // now create tokens
            const accessToken = createAccessToken(foundUser.id, roles);
            // const refreshToken = createRefreshToken(foundUser.id);

            const userId = foundUser.id
             // find a user with id and set its refreshToken
            //  await User.findOneAndUpdate({ id }, { refreshToken });
    


            // store token in cookie
            res.cookie('access-token', accessToken);
            // cookie is automatically sent with every request
            // httpOnly cookie is not available to javascript so it is safe
            // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            console.log('id', userId);
            res.status(200).json({ data: {accessToken, userId}, message: "logged in successfully" });
    
        } catch (err){
            res.status(400).json(err.message);
        }       
    }
}

module.exports = new loginHandler();