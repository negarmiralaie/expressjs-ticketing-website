const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectID;
const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');

class CreateTicketController {
  handleCreateTicket = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { userId } = req;
    const {
      title,
      description,
      requestType,
    } = req.body;

    try {
      // Now find user with given id
      const foundUser = await UserModel.find({
        _id: ObjectId(userId),
      });
      if (!foundUser) {
        res.status(400);
        throw createError.BadRequest('Unauthorized');
      }

      const ticket = await TicketModel.create({
        title,
        description,
        requestType,
        status: 'pending',
        user: foundUser[0],
      });

      console.log(ticket);

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
