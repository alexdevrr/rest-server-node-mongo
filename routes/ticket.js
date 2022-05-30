const { Router } = require('express');

const { addOrder } = require('../controllers/tickets');

const router = Router();

/**
 * @swagger
 * paths:
 *  ticket/order:
 *   post:
 *      summary: Endpoint para generar la orden de los productos
 *      tags: [Ticket]
 *      responses:
 *          '200':
 *            description: OK
 *            examples:
 *              application/json: {"creator": "alejandro@gmail.com", "totalPrice": 33.89, "order": ["hamburguesa_precio": 50, "hamburguesa_nom": "Don K", "qty": 1]}
 *
 *
 */
router.post('/order', addOrder);

module.exports = router;
