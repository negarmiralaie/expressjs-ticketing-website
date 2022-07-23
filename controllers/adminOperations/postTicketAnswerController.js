const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectID;
const TicketModel = require('../../models/Ticket');

class PostTicketAnswerController {
  handlePostTicketAnswer = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { ticketId } = req.query;
    console.log('ticketId', ticketId);
    const {
      answer,
    } = req.body;

    try {
      // Now find user with given id
      const foundTicket = await TicketModel.find({
        _id: ObjectId(ticketId),
      });
      if (!foundTicket) {
        res.status(400);
        throw createError.BadRequest('This ticket does not exist');
      }

      // Now attach ticket to its user
      await TicketModel.updateOne({ ticketId }, { $set: { answer, status: 'answered' } });
      await foundTicket.save;

      return res.status(200).json({
        message: 'Answer is successfully attached',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new PostTicketAnswerController();
