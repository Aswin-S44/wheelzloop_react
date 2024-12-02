const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: String, required: true },
    varient: { type: String },
    kilometer: { type: Number },
    fuelType: { type: String, required: true },
    transmission: { type: String },
    rate: { type: Number, required: true },
    brand: { type: String, required: true },
    place: { type: String },
    bodyType: { type: String },
    totalSeats: { type: Number },
    ownership: { type: String },
    priceNegotiable: { type: Boolean, default: false },
    insuranceValidity: { type: String, required: true },
    rto: { type: String, required: true },
    mileage: { type: Number },
    underWarrenty: { type: Boolean, required: true },
    images: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isSold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 5;
}

const Cars = mongoose.model("Car", carSchema);

module.exports = Cars;
