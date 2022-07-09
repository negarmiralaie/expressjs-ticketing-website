const JWT = require('jsonwebtoken');
const client = require('../config/init_redis');
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
    signRefreshToken: async (userId) => {
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
                // client.connect().then(() => {
                    client.SET(userId, token, 'EX', 365 * 24 * 60 * 60 , (err, reply) => {
                        if (err) {
                            console.log(err.message);
                            reject(createError.InternalServerError());
                            return;
                        }
                        resolve(token);
                    })
                    // .then(() => {
                        // client.EXPIRE(userId, 3600);
                        // client.quit();
                    // })
                // });
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    console.log('refreshToken', refreshToken);
                    console.log('process.env.REFRESH_TOKEN_SECRET', process.env.REFRESH_TOKEN_SECRET)
                    console.log(err.message);
                    // const errorMessage = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                    // return next(createError.Unauthorized(errorMessage));
                    reject(createError.Unauthorized());
                }
                const userId = payload.userId;
                client.GET(userId, (err, result) => {
                    if (err) {
                        console.log(err.message);
                        reject(createError.InternalServerError());
                        return;
                    }
                    console.log('Stored refresh token:', result);

                    if (refreshToken === result) return resolve(userId);
                    reject(createError.Unauthorized());
                })
                // resolve(payload.userId);
            });
        });

        // JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) =>{
        //     if (err){
        //         console.log('err', err);        req.userId = payload.userId;
        //         const errorMessage = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        //         return next(createError.Unauthorized(errorMessage));
        //     }
        //     req.userId = payload.userId;
        //     next();
        // });
    }
}