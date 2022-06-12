const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    title: {
        type: 'string',
        required: [true, "Title is required"]
    },
    description: {
        type: 'string',
        required: [true, "Description is required"]
    },
    status: {
        type: String,
        default: 'Pending',
        required: [true, "Status is required"]
    },
    date:{
        type: Date,
        default: Date.now()
    },
    requestType:{
        type: String,
        required: [true, "Request type is required"]
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});


module.exports = mongoose.model('ticket', TicketSchema);