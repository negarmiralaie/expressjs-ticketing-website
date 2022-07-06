const JWT = require('jsonwebtoken');
const createError = require("http-errors");

const verifyAccessToken = (req, res, next) => {
    if (!req.cookies) return next(createError.Unauthorized());
    const cookies = req.cookies;
    const accessToken = cookies['access-token'];
    if (!accessToken) return next(createError.Unauthorized());
    
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) =>{
        if (err){
            console.log('err', err);        req.userId = payload.userId;
            const errorMessage = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(createError.Unauthorized(errorMessage));
        }
        req.userId = payload.userId;
        next();
    });
}

module.exports = verifyAccessToken;