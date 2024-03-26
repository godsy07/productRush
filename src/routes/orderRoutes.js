const express = require('express');

const { isAuth } = require('../middleware/auth');
const OrderController = require('../controller/OderController');

const router = express.Router();

router.post('/create-order', OrderController.createOrder);
router.post('/payment-capture', OrderController.paymentCapture);
router.post('/payment-refund', OrderController.paymentRefund);

module.exports = router;
