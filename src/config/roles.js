const roles = ['admin'];

const rolePermissions = new Map();
rolePermissions.set(roles[0], ['create_user', 'admin_update_user', 'admin_create_company']);

module.exports = {
    roles,
    rolePermissions
}