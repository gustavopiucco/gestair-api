const roles = ['admin', 'company_manager', 'company_unit_manager'];

const rolePermissions = new Map();
rolePermissions.set(roles[0], ['create_user', 'update_user_company', 'update_user_customer', 'admin_create_company']);
rolePermissions.set(roles[1], ['create_customer', 'update_user_customer']);
rolePermissions.set(roles[2], ['create_unit']);

module.exports = {
    roles,
    rolePermissions
}