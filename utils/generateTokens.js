require('dotenv').config();
require('express-async-errors');

const jwt = require('jsonwebtoken');

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(err);
      }
      resolve(token);
    });
  });
};

const generateAccessToken = async (userId) => {
  const accessToken = await signAccessToken(userId);
  return accessToken;
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(err);
      }
      resolve(token);
    });
  });
};

const generateRefreshToken = async (userId) => {
  const refreshToken = await signRefreshToken(userId);
  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
