const createError = require('http-errors');
const ObjectId = require('mongodb').ObjectID;
const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');

class DeleteTicketController {
  handleDeleteTicket = async (req, res, next) => {
    try {
      const {
        ticketId,
      } = req.params;
      // const user = await TicketModel.find({"_id": ObjectId(ticketId)})
      const user = await TicketModel.findById(ticketId);
      // First delete ticket from tickets db
      await TicketModel.deleteOne({
        _id: ObjectId(ticketId),
      });

      // Then delete ticket from user tickets arr in db
      // const foundUser = await UserModel.find({"_id": ObjectId(user[0].user)});
      await UserModel.findOneAndUpdate({
        _id: ObjectId(user.user),
      }, {
        $pull: {
          tickets: ObjectId(ticketId),
        },
      });

      return res.status(200).json({
        message: 'تیکت با موفقیت حذف شد.',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'خطای سرور',
      });
    }
  };
}

module.exports = new DeleteTicketController();
