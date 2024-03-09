const mongoose = require("mongoose");

const productFilterSchema = new mongoose.Schema(
  {
    filter: { type: String, min: 2, max: 40, required: true },
    price: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
  },
  { timestamps: true },
);


const ProductFilter = mongoose.model('product-filter', productFilterSchema);

module.exports = ProductFilter;