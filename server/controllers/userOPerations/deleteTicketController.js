const TicketModel = require('../../models/Ticket');
const ObjectId = require('mongodb').ObjectID;

class deleteTicketController {
    handleDeleteTicket = async (req, res) => {

        try{

            const ticketId = req.params.ticketId;
            await TicketModel.deleteOne({_id: ObjectId(ticketId)});

            return res.status(200).json({message: "تیکت با موفقیت حذف شد."});
        } catch(error){
            return res.status(500).json({ message: "خطای سرور" });
        }
    }
}

module.exports = new deleteTicketController();