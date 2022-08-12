const ObjectId = require('mongodb').ObjectID;
const createError = require('http-errors');
const UserModel = require('../models/User');
const TicketService = require('./ticket.service');

class UserService {
  getUserById = async (userId) => { // eslint-disable-line class-methods-use-this
    try {
      return await UserModel.findOne({ _id: ObjectId(userId) });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  getUserByIdentifier = async (identifier) => { // eslint-disable-line class-methods-use-this
    try {
      return await UserModel.findOne({ identifier });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  getUserByVerificationId = async (verificationId) => { // eslint-disable-line
    try {
      return await UserModel.findOne({ verificationId });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  getUserTickets = async (userId) => {
    try {
      const foundUser = await this.getUserById(userId);
      if (foundUser.tickets.length === 0) return [];
      // Use toString for converting "new ObjectId to plain id"
      const foundUserTicketIds = await foundUser[0].tickets
        .map((ticketObjectId) => ticketObjectId.toString());
      const userTicketsArr = [];

      for (let i = 0; i < foundUserTicketIds.length; i++) {
        const ticketId = foundUserTicketIds[i];
        const ticket = await TicketService.getTicket(ticketId); // eslint-disable-line
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
      if (ticketsArr.length === 0) return [];
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
      const foundUser = await this.getUserById(userId);
      return foundUser.role;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  getUserVerificationState = async (verificationId) => {
    try {
      const foundUser = await this.getUserByVerificationId(verificationId);
      return foundUser.isVerified;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  updateUser = async (userId, data) => { // eslint-disable-line class-methods-use-this
    try {
      return await UserModel.updateMany({ userId }, { $set: data });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };
}

module.exports = new UserService();
