const createError = require('http-errors');
const UserService = require('../../services/user.service');

class GetUserTicketsController {
  handleGetUserTickets = async (req, res, next) => { // eslint-disable-line
    try {
      const { userId } = req;

      // Now find user with given id
      const foundUser = await UserService.getUser(userId);
      if (!foundUser) {
        res.status(401);
        throw createError.Unauthorized('کاربر موجود نمیباشد');
      }

      const arr = await UserService.getUserTickets(userId);

      return res.status(200).json({
        data: {
          arr,
        },
        message: 'Tickets are successfully fetched',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new GetUserTicketsController();
