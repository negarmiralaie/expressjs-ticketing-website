const TicketModel = require('../../models/Ticket');
const UserModel = require('../../models/User');
const ObjectId = require('mongodb').ObjectID;
const createError = require("http-errors");

class createTicketController {
    handleCreateTicket = async (req, res, next) => {
        const userId = req.userId;
        const {
            title,
            description,
            requestType
        } = req.body;

        try {
            // Now find user with given id
            let foundUser = await UserModel.find({
                "_id": ObjectId(userId)
            })
            if (!foundUser) throw createError.BadRequest("کاربر موجود نمیباشد.")

            const ticket = await TicketModel.create({
                title,
                description,
                requestType,
                "status": "pending",
                "user": foundUser[0]
            });

            console.log(ticket)

            // Now attach ticket to its user
            await UserModel.updateMany({
                userId
            }, {
                $push: {
                    "tickets": ticket
                }
            });
            await foundUser.save;

            return res.status(200).json({
                message: "تیکت با موفقیت ایجاد شد."
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new createTicketController();