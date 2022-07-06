const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = { userId };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "1h",
                issuer: "http://localhost:5000",
            };
            // We can also put exp and iss in payoad but if we put them in both places we will get an error
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError(err));
                }
                resolve(token);
            })
        })
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = { userId };
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                issuer: "http://localhost:5000",
            };
            // We can also put exp and iss in payoad but if we put them in both places we will get an error
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    // const errorMessage = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message ;
                    // return next(createError.Unauthorized(errorMessage));
                    reject(createError.InternalServerError(err));
                }
                resolve(token);
            })
        })
    }
}