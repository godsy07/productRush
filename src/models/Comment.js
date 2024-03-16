const mongoose = require("mongoose");

const productCommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);


const Comment = mongoose.model('productComment', productCommentSchema);

module.exports = Comment;