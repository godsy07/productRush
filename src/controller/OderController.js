const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const Razorpay = require('razorpay');

const SchemaKeys = require("../utils/joi/schema/keys");
const { handleServerError } = require("../middleware/errorHandling");
const { RAZORPAY_KEY_ID, RAZORPAY_SECRET_KEY } = require("../../config");

const controller = "OrderController";

const createOrder = async (req, res) => {
  try {
    // const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_SECRET_KEY });

    // var options = {
    //   amount: 50000,  // amount in the smallest currency unit
    //   currency: "INR",
    //   receipt: "order_rcptid_11",
    //   payment_capture: 1,
    // };
    // const response = razorpay.orders.create(options);
    // if (response.err) {
    //   return res.status(500).json({ status: false, message: "Could not create order." });
    // }
    // return res.status(200).json({ status: true, order: response, message: 'You have created an order.' });
    
    // razorpay .orders.create(options, function(err, order) {
    //   if (err) {
    //     return res.status(500).json({ status: false, message: "Could not create order." });
    //   }
    // });
    // return res.status(200).json({ status: true, order, message: 'You have created an order.' });
    
    return res.status(200).json({ status: true, message: 'You have created an order.' });
  } catch (e) {
    return handleServerError(res, controller);
  }
}

const paymentCapture = async (req, res) => {
  try {
    // const { order_id } = req.body;

    // const data = crypto.createHmac('sha256', secret_key)
    // data.update(JSON.stringify(req.body))

    // const digest = data.digest('hex')

    // if (digest === req.headers['x-razorpay-signature']) {

    //   console.log('request is legit')

    //   //We can send the response and store information in a database.

    //   res.json({

    //     status: 'ok'

    //   })

    // } else {

    //   res.status(400).send('Invalid signature');

    // }

    return res.status(200).json({ status: true, message: 'You have completed payment for your order.' });
  } catch (e) {
    return handleServerError(res, controller);
  }
}

const paymentRefund = async (req, res) => {
  try {

    //Verify the payment Id first, then access the Razorpay API.

    const options = {

      payment_id: req.body.paymentId,

      amount: req.body.amount,

    };

    const razorpayResponse = await razorpay.refund(options);

    //We can send the response and store information in a database

    res.send('Successfully refunded')

  } catch (error) {

    console.log(error);

    res.status(400).send('unable to issue a refund');

  }
}

module.exports = {
  createOrder,
  paymentCapture,
  paymentRefund,
}