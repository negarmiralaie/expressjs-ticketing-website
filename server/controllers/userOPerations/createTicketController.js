const mongoose = require('mongoose');
// const toObjectId = mongoose.Types.ObjectId;
const TicketModel = require('../../models/Ticket');
const { User } = require('../../models/User');
const toId = mongoose.Types.ObjectId;

// /ticket/create/:id

class createTicketController {
    handleCreateTicket = async (req, res) => {
        const userId = req.params.id;
        const { title, description, requestType } = req.body;

        try{
            // Now find user with given id
            let foundUser = await User.findOne({ userId });
            if (!foundUser) return res.status(401).json({ message: "کاربر وجود ندارد." }); //Unauthorized

            const ticket = await TicketModel.create ({
                title,
                description,
                requestType,
                "user": foundUser
            });

            // Now attach ticket to its user
            await User.updateMany({ userId },{$push:{"tickets": ticket}});
            await foundUser.save;
            return res.status(200).json({ message: "تیکت با موفقیت ایجاد شد."});
        } catch(error){
            return res.status(500).send({ message: "خطای سرور" });
        }
    }
}

module.exports = new createTicketController();

