const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 80, required: true },
    brand: { type: String, min: 2, max: 80, required: true },
    model: { type: String, min: 2, max: 80, required: true },
    price: { type: Number, required: true },
    image_url: { type: String, max: 250, required: true },
    catgeory: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  },
  { timestamps: true },
);


const Product = mongoose.model('product', productSchema);

module.exports = Product;