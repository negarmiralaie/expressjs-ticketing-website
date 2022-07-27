const createError = require('http-errors');
const UserService = require('../../services/user.service');

class GetUserTicketsController {
  handleGetUserTickets = async (req, res, next) => { // eslint-disable-line
    try {
      const { userId } = req;

      // Now find user with given id
      const foundUser = await UserService.getUserById(userId);
      if (!foundUser) throw createError(404, 'User does not exist');

      const userTickets = await UserService.getUserTickets(userId);

      return res.status(200).json({
        data: {
          userTickets,
        },
        message: 'Tickets are successfully fetched',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new GetUserTicketsController();
