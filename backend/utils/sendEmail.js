const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 578,
    secure: false,
    service: "gmail",
    auth: {
      user: "minhbngcd19815@fpt.edu.vn",
      pass: "nhatminh5331",
    },
  });

  const mailOptions = {
    form: "Nguyen FPT",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
