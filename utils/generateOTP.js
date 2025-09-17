const crypto = require('crypto');

const generateOTP = async () => {
  try {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += crypto.randomInt(0, 10);
    }
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    return { otp, expiresAt };
  } catch (err) {
    throw new Error("Error generating OTP: " + err.message);
  }
};

module.exports = generateOTP;