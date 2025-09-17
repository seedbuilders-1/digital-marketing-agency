const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModels');
const userModel = require('../models/userModels');

const login = async (email, password) => {
  const user = await userModel.getuserByEmail(email);
  if (!user) throw new Error( 'user not found' );

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error ( 'invalid email or password' );

  // create token
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role.title },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  const { password: _, ...safeUser } = user;
  return { tokens: {accessToken, refreshToken}, user: safeUser };
};

const saveToken = async (tokenData) => {
  return await authModel.saveToken(tokenData);
};

const getToken = async (id) => {
  return await authModel.getToken(id);
};

const updatePassword = async (updateData) => {
  return await authModel.updatePassword(updateData);
};

const getOTP = async (otpData) => {
  return await authModel.getOTP(otpData);
};

const saveOTP = async (otpData) => {
  return await authModel.saveOTP(otpData);
};

const verifyEmail = async (id) => {
  return await authModel.verifyEmail(id);
};

module.exports = {
  login,
  saveToken,
  getToken,
  updatePassword,
  saveOTP,
  verifyEmail,
  getOTP,
}