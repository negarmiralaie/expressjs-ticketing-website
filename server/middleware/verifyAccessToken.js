const JWT = require('jsonwebtoken');
const createError = require("http-errors");

const verifyAccessToken = (req, res, next) => {
    if (!req.cookies) return next(createError.Unauthorized());
    const cookies = req.cookies;
    const accessToken = cookies['access-token'];
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) =>{
        console.log('err', err)
        if (err) return next(createError.Unauthorized());
        req.userId = payload.userId;
        // req.payload = payload;
        // console.log('payload', payload);
        next();
    });
}

module.exports = verifyAccessToken;