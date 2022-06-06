const {User, validate} = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');

const createAccessToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10s' });
}

// const createRefreshToken = () =>{
//     return jwt.sign(
//         { "id": foundUser.id },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: '1d' }
//     );
// }

class loginHandler{
    handleLogin = async (req, res) => {
        const { error } = validate(req.body);
        // if (error) return res.status(400).json(error.details[0].message);
    
        let { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    
        phoneNumber = phoneNumber.trim();
        password = password.trim();
        
        const foundUser = await User.findOne({phoneNumber});
        if (!foundUser) return res.status(401).json({ message: "user does not exist" }); //Unauthorized
    
        // const secret = process.env.JWT_SECRET + user.password;
        try{
            // const payload = jwt.verify(token, secret);
            // If we reach here, it means token is successfully verified, otherwised it will directly go to catch block
            // const match = await bcrypt.compare(password, user.password);
            const match = await bcrypt.compare(password ,foundUser.password);
            if(!match) return res.status(400).json({ message: "password does not match"})
            
            // const roles = Object.values(foundUser.roles).filter(Boolean);
            // now create token
            const token = createAccessToken(foundUser.id);
    
            // store token in cookie
            res.cookie('access-token', token);
            res.status(200).json({ data: token, message: "logged in successfully" });
    
        } catch (err){
            res.status(400).json(err.message);
        }       
    }
}

module.exports = new loginHandler();