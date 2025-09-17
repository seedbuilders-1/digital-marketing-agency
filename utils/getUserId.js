const jwt = require('jsonwebtoken');

const getUserIdFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new Error('No valid token in header');

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET); // or REFRESH_SECRET
  return decoded.id;
};

module.exports={ getUserIdFromHeader, };