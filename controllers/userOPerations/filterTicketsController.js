const createError = require('http-errors');
const UserService = require('../../services/user.service');

class FilterUserTicketsController {
  handleFilterUserTickets = async (req, res, next) => { // eslint-disable-line
    try {
      const { userId } = req;
      const desiredTicketStatus = req.query.status;

      // Now find user with given id
      const foundUser = await UserService.getUser(userId);
      if (!foundUser) {
        res.status(401);
        throw createError.BadRequest('Unauthorized');
      }

      const arr = await UserService.filterUserTickets(userId, desiredTicketStatus);

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

module.exports = new FilterUserTicketsController();
