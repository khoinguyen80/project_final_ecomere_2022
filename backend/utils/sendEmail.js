const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "nguyendtkgcd17311@fpt.edu.vn",
      pass: "01668596926",
    },
  });

  const mailOptions = {
    form: "nguyendtkgcd17311@fpt.edu.vn",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
