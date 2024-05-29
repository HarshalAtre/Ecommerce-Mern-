const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');

const sendEmail = async (options) => {

  // Load the self-signed certificate
  const ca = [fs.readFileSync(path.resolve(__dirname, 'path/to/your/self-signed-cert.crt'))];

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    secure: process.env.SMPT_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Not recommended for production, for testing only
      ca: ca, // Adding the self-signed certificate
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
