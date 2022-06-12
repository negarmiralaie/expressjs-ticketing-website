const mongoose = require('mongoose');
// const toObjectId = mongoose.Types.ObjectId;
const TicketModel = require('../../models/Ticket');
const { UserModel } = require('../../models/User');

// /ticket/create/:id

class createTicketController {
    handleCreateTicket = async (req, res) => {
        const userId = req.params.id;
        const { title, description, requestType } = req.body;
        
        // Now find user with given id
        // const foundUser = await UserModel.find({ userId }).exec();
        // const foundUser = await UserModel.find({ userId });
        // const foundUser = await UserModel.findOne({ "name": "bbb" });
        console.log('UserModel', UserModel)
        // const foundUser = await UserModel.findOne({'_id':new mongo.ObjectID(userId)});
        // console.log('foundUser', foundUser);

        // const ticket = TicketModel.create ({
        //     title,
        //     description,
        //     requestType,
        // });

        // foundUser.tickets.push({ ticket });
        // foundUser.save();

       // // UserModel.findByIdAndUpdate(userId, {} )
        
        // UserModel.findOne({})
        // .populate('tickets')
        // .exec((err, ticket) => {
        //   console.log('ticket', ticket)  
        // })

        // const ticketObjectId = toObjectId(req.params.id);
        // const ticket = await Ticket.findById(ticketObjectId);
    }
}

module.exports = new createTicketController();

