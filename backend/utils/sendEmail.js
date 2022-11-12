const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "khoahmtgcd18616@fpt.edu.vn",
      pass: "hmtk3112000",
    },
  });

  const mailOptions = {
    form: "khoahmtgcd18616@fpt.edu.vn",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
