const mongoose = require('mongoose');
const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');

// /ticket/get-user-tickets/:id

class getUserTicketsController {
    handlegetUserTickets = async (req, res) => {
        const userId = req.params.id;

        try{
            // Now find user with given id
            let foundUser = await UserModel.findOne({ userId });
            if (!foundUser) return res.status(401).json({ message: "کاربر وجود ندارد." }); //Unauthorized
            
            // Use toString for converting "new ObjectId to plain id"
            const foundUserTicketIds = await foundUser.tickets.map( ticketObjectId => ticketObjectId.toString());
            
            const arr = [];

            for(let i=0; i<foundUserTicketIds.length;i++){
                const id = foundUserTicketIds[i];
                const ticket = await TicketModel.findOne({ id });
                arr.push(ticket);
            }

            return res.status(200).json({ data:{arr} ,message: "تیکت ها با موفقیت دریافت شدند."});
        } catch(error){
            return res.status(500).send({ message: "خطای سرور" });
        }
    }
}

module.exports = new getUserTicketsController();