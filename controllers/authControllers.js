const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authService = require('../services/authServices');
const userService = require('../services/userServices');
const generateToken = require('../utils/generateToken');
const generateOTP = require('../utils/generateOTP');
const { sendSuccess, sendError } = require('../utils/response');

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return sendError(res, 400, 'No refresh token provided');

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '1h' }
    );

    return sendSuccess(res, 200, { accessToken: newAccessToken });
  } catch (err) {
    return sendError(res, 401, 'Invalid or expired refresh token', err.message);
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Email and Password required');
    }

    const result = await authService.login(email, password);

   
    if (!result) { 
      return sendError(res, 401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = result.tokens;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // More robust check
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return sendSuccess(res, 200, { accessToken: accessToken, user: result.user }, 'Login successful!');

  } catch (err) {
  
    if (err.message === 'Invalid credentials') {
      return sendError(res, 401, 'Invalid credentials'); 
    }

    
  
    return sendError(res, 500, 'An unexpected error occurred. Please try again later.');
  }
};

exports.forgot_password = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, 400, 'Email is required');

    const user = await userService.getuserByEmail(email);
    if (!user) return sendError(res, 404, 'User not found');

    const id = user.id;
    const getToken = await authService.getToken(id);
    if (getToken) return sendError(res, 429, 'A token has already been created within the last 15 mins');
  
    const { token, expiresAt } = await generateToken();
    const hashedToken = await bcrypt.hash(token, 10);
    const save = await authService.saveToken({ hashedToken, expiresAt, id });

    let new_token = "/reset-password/" + token + "/" + id;

    return sendSuccess(res, 200, { token: new_token }, 'Add this URL to your /auth path');
  
  } catch (err) {
    return sendError(res, 500, 'Could not reset password', err.message);
  }
};

exports.reset_password = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return sendError(res, 400, 'New password is required');

    const token = req.params.token;
    const id = req.params.id;
    const savedToken = await authService.getToken(id);
    if (!savedToken) return sendError(res, 400, 'expired or invalid token');

    const hashed_token = savedToken.token;
    const tokenMatch = await bcrypt.compare(token, hashed_token);
    if (!tokenMatch) return sendError(res, 400, 'invalid or expired token');

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await authService.updatePassword({ id: savedToken.user_id, password: hashed_password });

    return sendSuccess(res, 200, {user: user}, 'Password has been updated successfully!');
  } catch (err) {
    return sendError(res, 500, 'Failed to reset password', err.message);
  }
};

exports.verify_email = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return sendError(res, 400, 'otp is required!');

    const id = req.params.id;

    const savedOTP = await authService.getOTP(id);
    if (!savedOTP) return sendError(res, 400, 'expired or invalid otp');

    const hashedOTP = savedOTP.otp;
    const otpMatch = await bcrypt.compare(otp, hashedOTP);
    if (!otpMatch) return sendError(res, 400, 'invalid or expired otp');

    const verify = await authService.verifyEmail(id);

    return sendSuccess(res, 200, { user: verify }, 'Email has been verified successfully!')
  } catch (err) {
    return sendError(res, 500, 'Failed to verify email', err.message);
  };

};

exports.resend_otp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, 400, 'Email is required');

    const user = await userService.getuserByEmail(email);
    if (!user) return sendError(res, 404, 'User not found');

    const id = user.id;
    const getOTP = await authService.getOTP(id);
    if (getOTP) return sendError(res, 429, 'An otp has already been sent within the last 5 mins');

    const { otp, expiresAt } = await generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const save = await authService.saveOTP({ hashedOTP, expiresAt, id });

    return sendSuccess(res, 200, { otp, user }, 'OTP has been successfully generated!');
  } catch (err) {
    return sendError(res, 500, 'Could not resend an otp', err.message);
  }
}
