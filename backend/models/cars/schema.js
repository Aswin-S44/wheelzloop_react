const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: String, required: true },
    varient: { type: String, required: true },
    kilometer: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    rate: { type: Number, required: true },
    brand: { type: String, required: true },
    place: { type: String, required: true },
    bodyType: { type: String },
    totalSeats: { type: Number },
    ownership: { type: String, required: true },
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
