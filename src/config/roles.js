const roles = ['gestair_admin'];

const rolePermissions = new Map();
rolePermissions.set(roles[0], ['create_user', 'create_company']);

module.exports = {
    roles,
    rolePermissions
}