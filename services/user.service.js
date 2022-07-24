const ObjectId = require('mongodb').ObjectID;
const createError = require('http-errors');
const TicketModel = require('../models/Ticket');
const UserModel = require('../models/User');

class UserService {
  getUser = async (userId) => {
    try {
      return await UserModel.find({ _id: ObjectId(userId) });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  filterUserTickets = async (userId, desiredTicketStatus) => {
    try {
      const foundUser = await this.getUser(userId);

      // Use toString for converting "new ObjectId to plain id"
      const foundUserTicketIds = await foundUser[0].tickets
        .map((ticketObjectId) => ticketObjectId.toString());

      const ticketsArr = [];

      for (let i = 0; i < foundUserTicketIds.length; i++) {
        const id = foundUserTicketIds[i];
        const ticket = await TicketModel.find({ // eslint-disable-line
          _id: ObjectId(id),
        });
        ticketsArr.push(ticket);
      }
      // now filter ticketsArr to get tickets which match...
      const arr = [];

      for (let i = 0; i < ticketsArr.length; i++) {
        if (ticketsArr[i][0]) {
          if (ticketsArr[i][0].status === desiredTicketStatus) arr.push(ticketsArr[i][0]);
        }
      }

      return arr;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

//   getUserByTicketId = async (ticketId) => { // eslint-disable-line class-methods-use-this
//     try {
//       return await TicketModel.findById(ticketId);
//     } catch (error) {
//       throw createError.InternalServerError(error);
//     }
//   };

  // createTicket = async (ticket) => {
  //   try {
  //     console.log('ticket', typeof ticket);
  //     return await TicketModel.create(ticket);
  //   } catch (error) {
  //     throw createError.InternalServerError(error);
  //   }
  // };

    // updateTicket(ticket) {
    //     return this.$http.put('/api/tickets/' + ticket._id, ticket)
    //         .then(response => response.data);
    // }

//   deleteTicket = async (ticketId, userId) => { // eslint-disable-line class-methods-use-this
//     try {
//       // Delete ticket from tickets db
//       await TicketModel.deleteOne({
//         _id: ObjectId(ticketId),
//       });

//       // Delete ticket from user tickets arr in db
//       await UserModel.findOneAndUpdate({
//         _id: ObjectId(userId),
//       }, {
//         $pull: {
//           tickets: ObjectId(ticketId),
//         },
//       });
//     } catch (error) {
//       throw createError.InternalServerError(error);
//     }
//   };
}

module.exports = new UserService();
