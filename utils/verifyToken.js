const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => { 
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
}

module.exports = verifyToken;