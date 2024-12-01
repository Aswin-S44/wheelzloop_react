const mongoose = require("module");
const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: String, require: true },
    varient: { type: String },
    kilometer: { type: Number },
    fuelType: { type: String, required: true },
    transmission: { type: String },
    rate: { type: Number, required: true },
    brand: { type: String, required: true },
    location: { type: String, required: true },
    bodyType: { type: String },
    totalSeats: { type: String },
    ownership: { type: String },
    priceNegotiable: { type: Boolean, default: false },
    insuranceValidity: { type: String, required: true },
    rto: { type: String, required: true },
    mileage: { type: Number },
    underWarrenty: { type: Boolean, required: true },
    mainImage: { type: String, required: true },
    additionalImages: [],
    userId: { type: String, required: true },
    isSold: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

const Cars = mongoose.model("carSchema");
module.exports = Cars;
