const { prisma } = require('../config/db');

const saveToken = async ({ hashedToken, expiresAt, id }) => {
  const token = await prisma.password_token.create({
    data: {
      user_id: id,
      token: hashedToken,
      expires_at: expiresAt,
      created_at: new Date(),
    },
  });
  return token;
};

const getToken = async (id) => {
  const token = await prisma.password_token.findFirst({
    where: {
      user_id: id,
      expires_at: {
        gt: new Date(),
      },
    },
  });
  return token;
};

const updatePassword = async ({ id, password }) => {
  const user = await prisma.user.update({
    where: {id: id},
    data: {
      password: password,
    },
    omit: {
      password: true,
    }
  });
  return user;
};

const saveOTP = async ({ hashedOTP, expiresAt, id }) => {
  const otp = await prisma.otp.create({
    data: {
      user_id: id,
      otp: hashedOTP,
      expires_at: expiresAt,
      created_at: new Date(),
    },
  });
  return otp;
};

const verifyEmail = async (id) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      status: 'verified',
    },
    omit: {
      password: true,
    }
  });
  return user;
};

const getOTP = async (id) => {
  const otp = await prisma.otp.findFirst({
    where: {
      user_id: id,
      expires_at: {
        gt: new Date(),
      },
    },
  });
  return otp;
};

module.exports = {
  saveToken,
  getToken,
  updatePassword,
  saveOTP,
  verifyEmail,
  getOTP,
};