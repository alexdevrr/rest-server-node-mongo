const { Schema, model } = require('mongoose');

const TicketSchema = Schema({
  order: {
    type: Array,
    required: true,
  },

  creator: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = model('Ticket', TicketSchema);
