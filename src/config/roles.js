const roles = ['admin', 'company_manager'];

const rolePermissions = new Map();
rolePermissions.set(roles[0], ['create_user', 'admin_update_user', 'admin_create_company']);
rolePermissions.set(roles[1], ['create_customer']);

module.exports = {
    roles,
    rolePermissions
}