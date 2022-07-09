const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
} = require("../../helpers/jwtHelper");
const createError = require("http-errors");

class refreshTokenController {
    handleRefreshToken = async (req, res, next) => {
        try {
            const refreshToken = req.body;
            if (!refreshToken) throw createError.BadRequest();
            const userId = await verifyRefreshToken(refreshToken.refreshToken);
            // If user's refreshToken was valid we should create a new accesToken and a new refreshToken
            const accessToken = await signAccessToken(userId);
            const newRefreshToken = await signRefreshToken(userId);

            return res.json({
                data: {
                    accessToken: accessToken,
                    refreshToken: newRefreshToken
                }
            });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new refreshTokenController();