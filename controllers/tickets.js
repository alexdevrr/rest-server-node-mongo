const { request, response } = require('express');

const Ticket = require('../models/ticket');

const addOrder = async (req = request, res = response) => {
  const { order, creator, totalPrice } = req.body;
  try {
    const ticket = new Ticket({ order, creator, totalPrice });

    await ticket.save();

    res.json({
      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Algo salio mal...',
    });
  }
};

module.exports = {
  addOrder,
};
