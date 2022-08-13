const createError = require('http-errors');
const TicketService = require('../../services/ticket.service');

class PostTicketAnswerController {
  handlePostTicketAnswer = async (req, res, next) => { // eslint-disable-line class-methods-use-this
    const { ticketId } = req.query;
    const { answer } = req.body;

    try {
      // Now find ticket with given id
      const foundTicket = await TicketService.getTicket(ticketId);
      if (!foundTicket) throw createError(404, 'Ticket does not exist');

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
