const Cars = require("../../models/cars/schema");
const Enquiry = require("../../models/common/EnquiryModel");
const { sendEmail } = require("../../utils/sendEmail");

module.exports.sendEnquiry = async (req, res) => {
  try {
    let validBody = req.body.formData;
    validBody.allowWhatsappMessage = validBody.allowMessages;

    // await Enquiry.create(validBody);

    let carDetails = await Cars.findById(validBody.carId);

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>New Enquiry Received</h2>
      <p><strong>${validBody.fullName}</strong> has sent an enquiry for the car model: <strong>${carDetails.name}</strong>.</p>
      <p>Thank you for reaching out!</p>
      <footer style="margin-top: 20px; font-size: 12px; color: #555;">
        <p>WheelzLoop Team</p>
      </footer>
    </div>
  `;

    await sendEmail(null, "New Enquiry", "", htmlContent);

    res.status(200).send({ message: "Enquiry sent...." });
  } catch (error) {
    console.log("Error while sending enquiry : ", error);
    res.send({ error });
  }
};
