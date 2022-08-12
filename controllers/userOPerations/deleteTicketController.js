const createError = require('http-errors');
const TicketService = require('../../services/ticket.service');

class DeleteTicketController {
  handleDeleteTicket = async (req, res, next) => { // eslint-disable-line
    try {
      const { ticketId } = req.params;

      const ticket = await TicketService.getTicket(ticketId);
      if (!ticket) throw createError(404, 'Ticket does not exist');

      // Delete ticket from tickets db and delete ticket from user tickets arr in db
      await TicketService.deleteTicket(ticketId, ticket.user);

      return res.status(200).json({
        message: 'Ticket is successfully deleted.',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new DeleteTicketController();
