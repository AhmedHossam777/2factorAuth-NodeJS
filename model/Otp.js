const mongoose = require('mongoose');
const validator = require('validator');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  otp: {
    type: String,
    required: [true, 'Please provide an OTP'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
