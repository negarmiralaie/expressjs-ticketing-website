const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectID;
const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');

class DeleteTicketController {
  handleDeleteTicket = async (req, res, next) => { // eslint-disable-line
    try {
      const {
        ticketId,
      } = req.params;

      const user = await TicketModel.findById(ticketId);

      if (!user) {
        res.status(401);
        throw createError.BadRequest('Unauthorized');
      }

      // First delete ticket from tickets db
      await TicketModel.deleteOne({
        _id: ObjectId(ticketId),
      });

      // Then delete ticket from user tickets arr in db
      await UserModel.findOneAndUpdate({
        _id: ObjectId(user.user),
      }, {
        $pull: {
          tickets: ObjectId(ticketId),
        },
      });

      return res.status(200).json({
        message: 'Ticket is successfully deleted.',
      });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new DeleteTicketController();
