const adminService = require('../services/adminServices');
const userService = require('../services/userServices');
const getUserId = require('../utils/getUserId');
const { sendSuccess, sendError } = require('../utils/response');

exports.getAllAdmins = async (req, res) => {
    try {
        const rolename = 'admin'
        const role = await adminService.getRoleByName(rolename);
        if (!role) return sendError(res, 404, 'Admin role not found');

        const admins = await adminService.getAllAdmins(role.id);
        if (admins.length === 0) return sendError(res, 404, 'admins not found');
        return sendSuccess(res, 200, admins, 'Admins fetched successfully!');
    } catch (err) {
        return sendError(res, 500, 'Could not get admins', err.message);
    }
};

exports.getAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await adminService.getAdmin(id);
        if (!admin) return sendError(res, 404, 'admin not found');
        
        return sendSuccess(res, 200, admin, 'Admin fetched successfully!');

    } catch (err) {
        return sendError(res, 500, 'Could not get admin', err.message);
    }
}

exports.getRoles = async (req, res) => {
    try {
        const roles = await adminService.getRoles();
        if (roles.length===0) return sendError(res, 404, 'roles not found');
        return sendSuccess(res, 200, roles);
    } catch (err) {
        return sendSuccess(res, 500, 'Could not get roles', err.message);
    }
}

exports.getRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await adminService.getRoleById(id);
        if (!role) return sendError(res, 404, 'role not found');
        
        return sendSuccess(res, 200, role, 'Role fetched successfully');

    } catch (err) {
        return sendError(res, 500, 'Could not get admin', err.message);
    }
}

exports.createRole = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return sendError(res, 400, 'title and description are required');

        const role = await adminService.getRoleByName(title);
        if (role) return sendError(res, 400, 'role already exists');

        const user_id = await getUserId.getUserIdFromHeader(req);
        const newRole = await adminService.createRole({ title, description, user_id});
        return sendSuccess(res, 201, { role: newRole }, 'Role has been created successfully');
    } catch (err) {
        return sendError(res, 500, 'Could not create role', err.message);
    }
}

exports.updateRole = async (req, res) => {
    try {
        const id = req.params.id
        const { title, description } = req.body;
        if (!title || !description) return sendError(res, 400, 'title and description are required');

        const role = await adminService.getRoleById(id);
        if (!role) return sendError(res, 404, 'role not found');

        const updatedRole = await adminService.updateRole(id, { title, description });
        return sendSuccess(res, 200, { role: updatedRole }, 'Role has been created successfully');
    } catch (err) {
        return sendError(res, 500, 'Could not update role', err.message);
    }
}

exports.makeAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return sendError(res, 400, 'Email is required');

        const user = await userService.getuserByEmail(email);
        if(!user) return sendError(res, 404, 'user not found');
        const user_id = user.id;

        const rolename = 'admin'
        const role = await adminService.getRoleByName(rolename);
        if (!role) return sendError(res, 404, 'Admin role not found');
        const role_id = role.id;

        const admin = await adminService.makeAdmin({ user_id, role_id });

        return sendSuccess(res, 200, { user: admin }, 'user has been made an admin successfully!');
    } catch (err) {
        return sendError(res, 500, 'Could not make admin', err.message)
    }
}

exports.removeAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await adminService.getAdmin(id);
        if (!admin) return sendError(res, 404, 'Admin not found');

        const deleted = await adminService.removeAdmin(id);
        return sendSuccess(res, 200, { admin: deleted }, 'Admin has been deleted successfully!')

    } catch (err) {
        return sendError(res, 500, 'Could not remove admin', err.message);
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await adminService.getRoleById(id);
        if(!role) return sendError(res, 404, 'role not found');

        const deleted = await adminService.deleteRole(id);
        return sendSuccess(res, 200, { role: deleted }, 'Role has been deleted successfully!');
        
    } catch (err) {
        return sendError(res, 500, 'Could not delete Role', err.message);
    }
};