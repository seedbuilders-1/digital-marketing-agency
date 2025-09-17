const { prisma, defaultUserRoleId, defaultAdminRoleId } = require('../config/db');

const getAllAdmins = async (id) => {
    const admins = await prisma.user.findMany({
        where: {role_id: id, deleted_at: null},
        omit: {
            password: true,
        }
    });
    return admins;
};

const getAdmin = async (id) => {
    const admin = await prisma.user.findFirst({
        where: {
            id: id, 
            deleted_at: null,
            NOT: {
                role_id: defaultUserRoleId,
            },
        },
        omit: {
            password: true,
        }
    });
    return admin;
};

const getRoles = async () => {
    const roles = await prisma.role.findMany({
        where: { deleted_at: null },
        include: {
            creator: {
                select: {
                    name: true,
                }
            }
        }
    });
    return roles;
};

const getRoleById = async (id) => {
    const role = await prisma.role.findUnique({
        where: {
            id: id,
            deleted_at: null,
        },
        include: {
            creator: {
                select: {
                    name: true,
                }
            }
        }
    });
    return role;
};

const getRoleByName = async (rolename) => {
    const role = await prisma.role.findFirst({
        where: {title: rolename, deleted_at: null},
    });
    return role;
};

const createRole = async ({ title, description, user_id}) => {
    const role = await prisma.role.create({
        data: {
            title: title,
            description: description,
            created_by: user_id,
        },
        include: {
            creator: {
                select: {
                    name: true,
                }
            }
        }
    });
    return role;
};

const updateRole = async (id, { title, description }) => {
    const role = await prisma.role.update({
        where: {
            id: id,
            deleted_at: null,
        },
        data: {
            title: title,
            description: description,
        },
        include: {
            creator: {
                select: {
                    name: true,
                }
            }
        }
    });
    return role;
};

const makeAdmin = async ({ user_id, role_id }) => {
    const admin = await prisma.user.update({
        where: {
            id: user_id,
            deleted_at: null,
        },
        data: {
            role_id: role_id,
        },
        omit: {
            password: true,
        }
    });
    return admin;
};

const removeAdmin = async (id) => {
    const admin = await prisma.user.update({
        where: { id: id, deleted_at: null, },
        data: {
            role_id: defaultUserRoleId,
        }
    });
    return admin;
};

const deleteRole = async (id) => {
    const role = await prisma.role.update({
        where: {id: id},
        data: {
            deleted_at: new Date()
        }
    });
    return role;
};


module.exports = {
    getAllAdmins,
    getAdmin,
    getRoles,
    getRoleByName,
    getRoleById,
    createRole,
    updateRole,
    makeAdmin,
    removeAdmin,
    deleteRole,
};