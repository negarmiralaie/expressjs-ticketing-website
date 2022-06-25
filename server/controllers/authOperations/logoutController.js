const UserModel = require('../../models/User');
const jwt = require('jsonwebtoken');

class logoutController{
    handlelogout = async (req, res) => {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); //No content
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    }
}

module.exports = new logoutController();