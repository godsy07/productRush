const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 80, required: true },
    brand: { type: String, min: 2, max: 80, required: true },
    model: { type: String, min: 2, max: 80, required: true },
    product_image: { type: String, required: true },
    images: [{
      type: String,
      validate: {
        validator: function (images) {
          // Custom validator function to check if the length of images array is less than or equal to 4
          return images.length <= 3;
        },
        message: 'Images cannot have more than 3 items'
      }
    }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    productFilter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category-filter' }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true },
);


const Product = mongoose.model('product', productSchema);

module.exports = Product;