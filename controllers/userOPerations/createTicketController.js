const createError = require('http-errors');
const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');
const UserService = require('../../services/user.service');

class CreateTicketController {
  handleCreateTicket = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { userId } = req;
    const { title, description, requestType } = req.body;

    try {
      const foundUser = await UserService.getUserById(userId);
      if (!foundUser) throw createError(404, 'User does not exist');

      const ticket = await TicketModel.create({
        title,
        description,
        requestType,
        status: 'pending',
        user: foundUser,
      });

      // Now attach ticket to its user
      await UserModel.updateMany({
        userId,
      }, {
        $push: {
          tickets: ticket,
        },
      });
      await foundUser.save;

      return res.status(200).json({
        message: 'Ticket is successfully created',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new CreateTicketController();
