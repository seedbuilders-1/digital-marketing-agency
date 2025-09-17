const userModel = require('../models/userModels');

const getAllusers = async () => {
  return await userModel.getAllusers();
};

const getuserById = async (id) => {
  return await userModel.getuserById(id);
};

const getuserByEmail = async (email) => {
  return await userModel.getuserByEmail(email);
};

const getuserByTel = async (tel) => {
  return await userModel.getuserByTel(tel);
};

const createUser = async (userData) => {
  const { email } = userData;
  const existingUser = await userModel.getuserByEmail(email);
  if (existingUser) {
    const error = new Error('Email already exists');
    error.statusCode = 400;  
    throw error;
  };

  const { tel } = userData;
  const existingUserTel = await userModel.getuserByTel(tel);
  if (existingUserTel) {
    const error = new Error('Phone Number already exists');
    error.statusCode = 400;  
    throw error;
  };
  return await userModel.createUser(userData);
};

const updateUser = async (id, updateData) => {
    const { email } = updateData;
    const existingUser = await userModel.getupdateUserByEmail(id, email);
    if (existingUser) {
      const error = new Error('Email already exists');
      error.statusCode = 400;  
      throw error;
    };
  return await userModel.updateUser(id, updateData);
};

const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

const profile = async (id, profileData) => {
  return await userModel.profile(id, profileData);
};

module.exports = {
  getAllusers,
  getuserById,
  getuserByEmail,
  getuserByTel,
  createUser,
  updateUser,
  deleteUser,
  profile,
};