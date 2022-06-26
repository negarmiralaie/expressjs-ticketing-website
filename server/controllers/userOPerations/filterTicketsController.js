const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');
const ObjectId = require('mongodb').ObjectID;

// /ticket/filter-user-tickets/:id/tickets?filter="pending"

class filterUserTicketsController {
    handlefilterUserTickets = async (req, res) => {

        try{
            const userId = req.query.id;
            const desiredTicketStatus = req.query.status;

            // Now find user with given id
            const foundUser = await UserModel.find({"_id": ObjectId(userId)})
            if (!foundUser) return res.status(401).json({ message: "کاربر وجود ندارد." }); //Unauthorized
            // Use toString for converting "new ObjectId to plain id"
            const foundUserTicketIds = await foundUser[0].tickets.map( ticketObjectId => ticketObjectId.toString());
            const ticketsArr = [];

            for(let i=0; i<foundUserTicketIds.length;i++){
                const id = foundUserTicketIds[i];
                const ticket = await TicketModel.find({"_id": ObjectId(id)})
                ticketsArr.push(ticket);
            };

            // now filter ticketsArr to get tickets which match...
            const arr = [];

            for(let i=0; i<ticketsArr.length; i++){
                if(ticketsArr[i][0].status === desiredTicketStatus) 
                    arr.push(ticketsArr[i][0]);
            }

            return res.status(200).json({ data:{arr} ,message: "تیکت ها با موفقیت دریافت شدند."});
        } catch(error){
            return res.status(500).json({ message: "خطای سرور" });
        }
    }
}

module.exports = new filterUserTicketsController();