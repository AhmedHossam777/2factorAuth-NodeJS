require('dotenv').config();
require('express-async-errors');

const User = require('../model/User');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateTokens');

const emailService = require('../utils/emailService');
const {
  generateOTP,
  generateSecret,
  verifyOTP,
} = require('../utils/OTPServices');

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const DuplicateUser = await User.findOne({ email: email });
  if (DuplicateUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, email, password });

  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user._id),
    generateRefreshToken(user._id),
  ]);

  res.status(201).json({
    status: 'success',
    user,
    accessToken,
    refreshToken,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password' });
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(user._id),
    generateRefreshToken(user._id),
  ]);

  res.status(200).json({
    status: 'success',
    accessToken,
    refreshToken,
  });
};


const secret = generateSecret();

const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Please provide email' });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const otp = generateOTP(secret);

  await emailService.sendVerificationEmail(email, otp);

  res.status(200).json({ message: 'OTP sent to your email'});
};

const resetPassword = async (req, res, next) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }


  const isVerified = verifyOTP(otp, secret);
  if (!isVerified) {
    return res.status(500).json({ message: 'Error in generating OTP' });
  }
  user.password = password;
  await user.save();
  res.status(200).json({ message: 'Password reset successful' });
};

module.exports = { register, login, forgetPassword, resetPassword };
