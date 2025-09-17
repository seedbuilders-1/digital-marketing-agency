const adminModel = require('../models/adminModels');

const getAllAdmins = async (id) => {
    return await adminModel.getAllAdmins(id);
};

const getAdmin = async (id) => {
    return await adminModel.getAdmin(id);
};

const getRoles = async () => {
    return await adminModel.getRoles();
};

const getRoleByName = async (rolename) => {
    return await adminModel.getRoleByName(rolename);
};

const getRoleById = async (id) => {
    return await adminModel.getRoleById(id);
};

const createRole = async (roleData) => {
    return await adminModel.createRole(roleData);
};

const updateRole = async (id, roleData) => {
    return await adminModel.updateRole(id, roleData);
};

const makeAdmin = async (adminData) => {
    return await adminModel.makeAdmin(adminData);
};

const removeAdmin = async(id) => {
    return await adminModel.removeAdmin(id);
};

const deleteRole = async (id) => {
    return await adminModel.deleteRole(id);
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