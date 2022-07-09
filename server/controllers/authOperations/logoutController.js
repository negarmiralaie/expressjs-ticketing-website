const createError = require("http-errors");

class logoutController {
    handlelogout = async (req, res) => {
        const cookies = req.cookies;
        const accessToken = cookies['access-token'];
        if (!accessToken) return next(createError.Unauthorized());
        res.clearCookie('access-token', {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });
        res.cookie("access-token", "", {
            maxAge: 0,
            httpOnly: true,
        })
        res.sendStatus(204);
    }
}

module.exports = new logoutController();