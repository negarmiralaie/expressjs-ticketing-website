const jwt = require('jsonwebtoken');
require('dotenv').config();

const isLoggedIn = (req, res, next) => {
    const accessToken = req.cookies;
    console.log('accessToken', accessToken);

    if(!accessToken) return next();

    const {payload: user, expired} = verifyJWT (accessToken);

    if(user){
        req.user = user;
        return next();
    }
}

module.exports = isLoggedIn