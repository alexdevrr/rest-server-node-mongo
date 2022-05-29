const { Router } = require('express');

const { addOrder } = require('../controllers/tickets');

const router = Router();
router.post('/order', addOrder);

module.exports = router;
