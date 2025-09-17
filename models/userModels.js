const { prisma, defaultUserRoleId } = require("../config/db");

const getAllusers = async () => {
  const users = await prisma.user.findMany({
    where: { deleted_at: null },
    omit: {
      password: true,
    },
    include: {
      role: {
        select: {
          title: true,
        },
      },
    },
  });
  return users;
};

const getuserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { 
      id: id,
      deleted_at: null,
    },
    omit: {
      password: true,
    },
    include: {
      role: {
        select: {
          title: true,
        },
      },
    },
  });
  return user;
};

const getuserByEmail = async (email) => {
  const rows = await prisma.user.findUnique({
    where: {
      email: email,
      deleted_at: null,
    },
    include: {
      role: {
        select: {
          title: true,
        }
      }
    }
  });
  return rows;
};

const getupdateUserByEmail = async (id, email) => {
  const rows = await prisma.user.findUnique({
    where: {
      email: email,
      deleted_at: null,
    },
    NOT: {
      id: id
    },
    include: {
      role: {
        select: {
          title: true,
        }
      }
    }
  });
  return rows;
};

const getuserByTel = async (tel) => {
  const rows = await prisma.user.findUnique({
    where: {
      tel: tel,
      deleted_at: null,
    },
  });
  return rows;
};

const createUser = async ({
  name,
  email,
  tel,
  country,
  address,
  category,
  password,
}) => {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      tel: tel,
      country: country,
      address: address,
      category: category,
      password: password,
      role_id: defaultUserRoleId,
    },
    omit: {
      password: true,
    },
  });

  await prisma.notification_settings.create({
    data: {
      user_id: user.id,
    },
  });

  await prisma.privacy_settings.create({
    data: {
      user_id: user.id,
    },
  });

  return user;
};

const updateUser = async (
  id,
  { name, email, tel, country, address, category, password }
) => {
  const result = await prisma.user.update({
    where: {
      id: id,
      deleted_at: null,
    },
    data: {
      name: name,
      email: email,
      tel: tel,
      country: country,
      address: address,
      category: category,
      password: password,
    },
    omit: {
      password: true,
    },
  });
  return result;
};

const deleteUser = async (id) => {
  const user = await prisma.user.update({
    where: {
      id: id,
      deleted_at: null
    },
    data: {
      deleted_at: new Date()
    },
    omit: {
      password: true,
    },
  });
  await prisma.otp.deleteMany({ where: { user_id: id } });
  await prisma.password_token.deleteMany({ where: { user_id: id } });
  await prisma.privacy_settings.deleteMany({ where: { user_id: id } });
  await prisma.notification_settings.deleteMany({ where: { user_id: id } });
  return user;
};

const profile = async (id, { pfp_url, id_url, business_status, registered_with_a_business }) => {
  const profile = await prisma.user.update({
    where: { 
      id: id,
      deleted_at: null,
    },
    data: {
      pfp_url: pfp_url,
      id_url: id_url,
      business_status: business_status,
      registered_with_a_business: registered_with_a_business
    },
    omit: {
      password: true,
    },
  });
  return profile;
};

module.exports = {
  getAllusers,
  getuserById,
  getuserByEmail,
  getupdateUserByEmail,
  getuserByTel,
  createUser,
  updateUser,
  deleteUser,
  profile,
};
