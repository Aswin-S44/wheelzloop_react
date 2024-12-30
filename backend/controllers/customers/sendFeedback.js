const Feedback = require("../../models/common/Feedback");
const { sendEmail } = require("../../utils/sendEmail");

module.exports.sendFeedback = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    await Feedback.create(req.body);

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>New Feedback Received</h2>
      <p>Name : ${name}</p>
      <p>Email : ${email}</p>
      <p>${feedback}</p>
      <p>Thank you for reaching out!</p>
      <footer style="margin-top: 20px; font-size: 12px; color: #555;">
        <p>WheelzLoop Team</p>
      </footer>
    </div>
  `;

    await sendEmail(email, "Feedback", feedback, htmlContent);
    res.status(200).send({ message: "Successfully sent feedback!" });
  } catch (error) {
    console.log("Error while sending feedback : ", error);
    res.send({ error });
  }
};
