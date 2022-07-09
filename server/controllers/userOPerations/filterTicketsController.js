const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectID;
const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');

class FilterUserTicketsController {
  handleFilterUserTickets = async (req, res, next) => {
    try {
      const { userId } = this.req;
      const desiredTicketStatus = req.query.status;

      // Now find user with given id
      const foundUser = await UserModel.find({
        _id: ObjectId(userId),
      });
      if (!foundUser) throw createError.BadRequest('کاربرموجود نمیباشد.');

      // Use toString for converting "new ObjectId to plain id"
      const foundUserTicketIds = await foundUser[0].tickets
        .map((ticketObjectId) => ticketObjectId.toString());

      const ticketsArr = [];

      for (let i = 0; i < foundUserTicketIds.length; i++) {
        const id = foundUserTicketIds[i];
        const ticket = TicketModel.find({
          _id: ObjectId(id),
        });
        ticketsArr.push(ticket);
      }
      // now filter ticketsArr to get tickets which match...
      const arr = [];

      for (let i = 0; i < ticketsArr.length; i++) {
        console.log(i);
        if (ticketsArr[i][0]) {
          if (ticketsArr[i][0].status === desiredTicketStatus) arr.push(ticketsArr[i][0]);
        }
      }

      return res.status(200).json({
        data: {
          arr,
        },
        message: 'تیکت ها با موفقیت دریافت شدند.',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new FilterUserTicketsController();
