const mongoose = require("mongoose");

const categoryFilterSchema = new mongoose.Schema(
  {
    filters: [{ type: String, max: 40, required: true }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
  },
);


const CategoryFilter = mongoose.model('category-filter', categoryFilterSchema);

module.exports = CategoryFilter;