const crypto = require('crypto');

const generateToken = async () => {
  try {
    const token = crypto.randomBytes(32).toString('hex'); // raw token to send via email
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    return { token, expiresAt };
  } catch (err) {
    throw new Error("Error generating token: " + err.message);
  }
};

module.exports = generateToken;