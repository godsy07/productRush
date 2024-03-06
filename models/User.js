const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, min: 1, max: 30, required: true },
    last_name: { type: String, min: 1, max: 30, required: true },
    email: { type: String, unique: true, required: true },
    phone_no: { type: String, min: 10, max: 10, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;