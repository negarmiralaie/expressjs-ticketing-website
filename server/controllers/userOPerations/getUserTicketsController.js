const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');
const ObjectId = require('mongodb').ObjectID;

// /ticket/get-user-tickets/:id

class getUserTicketsController {
    handleGetUserTickets = async (req, res) => {
        const userId = req.params.id;

        try{
            // Now find user with given id
            const foundUser = await UserModel.find({"_id": ObjectId(userId)})

            if (!foundUser) return res.status(401).json({ message: "کاربر وجود ندارد." }); //Unauthorized
            
            // Use toString for converting "new ObjectId to plain id"
            const foundUserTicketIds = await foundUser[0].tickets.map( ticketObjectId => ticketObjectId.toString());
            
            const arr = [];

            for(let i=0; i<foundUserTicketIds.length;i++){
                const id = foundUserTicketIds[i];
                const ticket = await TicketModel.find({"_id": ObjectId(id)})
                arr.push(ticket);
            }

            return res.status(200).json({ data:{arr} ,message: "تیکت ها با موفقیت دریافت شدند."});
        } catch(error){
            return res.status(500).send({ message: "خطای سرور" });
        }
    }
}

module.exports = new getUserTicketsController();