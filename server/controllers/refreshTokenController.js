const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserModel = require('../models/User');

const handleRefreshToken = (req, res) =>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);
    const refreshToken = cookies.jwt;

    const foundUser = UserModel.findOne({ refreshToken });
    if(!foundUser) return res.status(403) //Forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>{
            if (err || foundUser.id !== decoded.id) return res.status(403) //Forbidden

            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { 
                    "UserInfo":{
                        "id": decoded.id, 
                        roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '3600s' }
            );

            return res.json ({ accessToken });
        }
    )

}