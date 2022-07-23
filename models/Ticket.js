const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: {
    type: 'string',
    required: [true, 'Title is required'],
  },
  description: {
    type: 'string',
    required: [true, 'Description is required'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  requestType: {
    type: String,
    required: [true, 'Request type is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  answer: {
    type: String,
  },
});

module.exports = mongoose.model('ticket', TicketSchema);
