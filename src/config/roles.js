const roles = ['gestair_admin'];

const rolePermissions = new Map();
rolePermissions.set(roles[0], ['create_user', 'update_user_company', 'create_company']);

module.exports = {
    roles,
    rolePermissions
}