const ObjectId = require('mongodb').ObjectID;
const createError = require('http-errors');
const UserModel = require('../models/User');
const TicketService = require('./ticket.service');

class UserService {
  getUser = async (userId) => {
    try {
      return await UserModel.find({ _id: ObjectId(userId) });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  getUserTickets = async (userId) => {
    try {
      const foundUser = await this.getUser(userId);
      // Use toString for converting "new ObjectId to plain id"
      const foundUserTicketIds = await foundUser[0].tickets
        .map((ticketObjectId) => ticketObjectId.toString());

      const userTicketsArr = [];

      for (let i = 0; i < foundUserTicketIds.length; i++) {
        const ticketId = foundUserTicketIds[i];
        const ticket = await TicketService.getTicket(ticketId);
        if (ticket) userTicketsArr.push(ticket);
      }

      return userTicketsArr;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  filterUserTickets = async (userId, desiredTicketStatus) => {
    try {
      const ticketsArr = await this.getUserTickets(userId);
      // now filter ticketsArr to get tickets which match...
      const filteredTicketsArr = [];

      for (let i = 0; i < ticketsArr.length; i++) {
        if (ticketsArr[i][0]) {
          if (ticketsArr[i][0].status === desiredTicketStatus) {
            filteredTicketsArr.push(ticketsArr[i][0]);
          }
        }
      }

      return filteredTicketsArr;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  getUserRole = async (userId) => {
    try {
      const foundUser = await this.getUser(userId);
      return foundUser[0].role;
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
