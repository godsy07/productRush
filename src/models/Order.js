const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, enum: ['created', 'unpaid', 'paid'], default: 'created' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true },
);


const Order = mongoose.model('order', orderSchema);

module.exports = Order;