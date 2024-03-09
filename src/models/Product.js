const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 80, required: true },
    brand: { type: String, min: 2, max: 80, required: true },
    model: { type: String, min: 2, max: 80, required: true },
    image_url: { type: String, max: 250, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    productFilter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category-filter' }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true },
);


const Product = mongoose.model('product', productSchema);

module.exports = Product;