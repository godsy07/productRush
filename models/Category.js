const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 40, unique: true, required: true },
    image_url: { type: String, max: 250, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  },
);


const Category = mongoose.model('category', categorySchema);

module.exports = Category;