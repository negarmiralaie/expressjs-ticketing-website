const ObjectId = require('mongodb').ObjectID;
const createError = require('http-errors');
const TicketModel = require('../models/Ticket');
const UserModel = require('../models/User');

class TicketService {
  getTicket = async (ticketId) => { // eslint-disable-line class-methods-use-this
    try {
      return await TicketModel.findById(ticketId);
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  addAnswerToTicket = async (ticketId, answer) => {
    try {
      const foundTicket = await this.getTicket(ticketId);
      await TicketModel.updateOne({ ticketId }, { $set: { answer, status: 'answered' } });
      return await foundTicket.save;
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };

  deleteTicket = async (ticketId, userId) => { // eslint-disable-line class-methods-use-this
    try {
      // Delete ticket from tickets db
      await TicketModel.deleteOne({ _id: ObjectId(ticketId) });

      // Delete ticket from user tickets arr in db
      await UserModel.findOneAndUpdate({
        _id: ObjectId(userId),
      }, {
        $pull: {
          tickets: ObjectId(ticketId),
        },
      });
    } catch (error) {
      throw createError.InternalServerError(error);
    }
  };
}

module.exports = new TicketService();
