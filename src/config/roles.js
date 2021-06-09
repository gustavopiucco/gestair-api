const roles = ['admin'];

const rolePermissions = new Map();
rolePermissions.set(roles[0], ['create_user', 'admin_update_user', 'create_company']);

module.exports = {
    roles,
    rolePermissions
}