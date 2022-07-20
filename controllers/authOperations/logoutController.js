const createError = require('http-errors');

class LogoutController {
  handlelogout = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { cookies } = req;
    const accessToken = cookies['access-token'];
    if (!accessToken) {
      res.status(400);
      next(createError.Unauthorized());
    }

    res.clearCookie('access-token', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    res.cookie('access-token', '', {
      maxAge: 0,
      httpOnly: true,
    });
    return res.sendStatus(204);
  };
}

module.exports = new LogoutController();
