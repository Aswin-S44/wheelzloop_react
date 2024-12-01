const mongoose = require("mongoose");
const { SALT_ROUND } = require("../../constants/constants");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    hasShop: { type: String, required: true },
    password: { type: String, required: true },
    hasVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    totalCars: { type: Number, default: 0 },
    soldCars: { type: Number, default: 0 },
    isDeactivated: { type: Boolean, default: false },
    isDeleated: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, SALT_ROUND);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
