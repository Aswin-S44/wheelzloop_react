const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    carId: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    allowWhatsappMessage: { type: Boolean, default: false },
    detailsShared: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = Enquiry;
