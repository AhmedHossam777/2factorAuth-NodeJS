require('express-async-errors');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // decoded is the payload = userId
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
};

module.exports = auth;
