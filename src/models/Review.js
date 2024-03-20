const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    comment: { type: String },
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
  },
  { timestamps: true },
);


const Review = mongoose.model('review', reviewSchema);

module.exports = Review;