// const UserModel = require('../../models/User');
// const jwt = require('jsonwebtoken');
// const createError = require("http-errors");

class logoutController{
    handlelogout = async (req, res) => {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); //No content
        res.clearCookie('access-token', { httpOnly: true, sameSite: 'None', secure: true });
        res.cookie("access-token", "",{
            maxAge: 0,
            httpOnly: true,
        })
        res.sendStatus(204);
    }
}

module.exports = new logoutController();