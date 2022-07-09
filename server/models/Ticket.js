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
        required: [true, "Status is required"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    requestType: {
        type: String,
        required: [true, "Request type is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
});


module.exports = mongoose.model('ticket', TicketSchema);