const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');
const ObjectId = require('mongodb').ObjectID;
const createError = require("http-errors");

// /ticket/get-user-tickets/:id

class getUserTicketsController {
    handleGetUserTickets = async (req, res) => {

        try{
            const userId = req.userId;
            // Now find user with given id
            const foundUser = await UserModel.find({"_id": ObjectId(userId)})

            if (!foundUser) throw createError.BadRequest("کاربر موجود نمیباشد")
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
            next(error);
        }
    }
}

module.exports = new getUserTicketsController();