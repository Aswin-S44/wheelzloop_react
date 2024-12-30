const nodemailer = require("nodemailer");

module.exports.sendEmail = async (
  from,
  subject,
  content,
  htmlContent = null
) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ROOT_EMAIL, //process.env.EMAIL_USER,
        pass: process.env.ROOT_PASSWORD, // process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from,
      to: "wheelzloop@gmail.com", // process.env.EMAIL_USER,
      subject,
      text: content,
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Error while sending email : ", error);
    return error;
  }
};
