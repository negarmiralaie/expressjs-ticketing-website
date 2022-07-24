const createError = require('http-errors');
const TicketService = require('../../services/ticket.service');

class PostTicketAnswerController {
  handlePostTicketAnswer = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { ticketId } = req.query;
    const { answer } = req.body;

    try {
      // Now find ticket with given id
      const foundTicket = await TicketService.getTicket(ticketId);
      if (!foundTicket) {
        res.status(400);
        throw createError.BadRequest('This ticket does not exist');
      }

      // Now attach ticket to its user
      await TicketService.addAnswerToTicket(ticketId, answer);

      return res.status(200).json({
        message: 'Answer is successfully attached',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new PostTicketAnswerController();
