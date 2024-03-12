const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  service: 'gmail',
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};
