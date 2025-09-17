const jwt = require('jsonwebtoken');
const { sendSuccess, sendError } = require('../utils/response');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return sendError(res, 401, 'No token provided');

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded; // attach user to request
    next();
  } catch (err) {
    return sendError(res, 401, 'Invalid or expired token', err.message);
  }
};