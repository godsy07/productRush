const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    rating: { type: Number, enum: [1,2,3,4,5], required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);


const Review = mongoose.model('review', reviewSchema);

module.exports = Review;