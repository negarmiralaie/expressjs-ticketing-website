const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectID;
const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');

class GetUserTicketsController {
  handleGetUserTickets = async (req, res, next) => { // eslint-disable-line
    try {
      const { userId } = req;
      // Now find user with given id
      const foundUser = await UserModel.find({
        _id: ObjectId(userId),
      });

      if (!foundUser) {
        res.status(401);
        throw createError.Unauthorized('کاربر موجود نمیباشد');
      }
      // Use toString for converting "new ObjectId to plain id"
      const foundUserTicketIds = await foundUser[0].tickets
        .map((ticketObjectId) => ticketObjectId.toString());

      const arr = [];

      for (let i = 0; i < foundUserTicketIds.length; i++) {
        const id = foundUserTicketIds[i];
        const ticket = await TicketModel.find({ // eslint-disable-line
          _id: ObjectId(id),
        });
        arr.push(ticket);
      }

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
