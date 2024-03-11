require('dotenv').config();
require('express-async-errors');

const User = require('../model/User');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateTokens');

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
    token,
    accessToken,
    refreshToken,
  });
};

module.exports = { register, login };
