const roles = ['gestair_admin'];

const rolePermissions = new Map();
rolePermissions.set(roles[0], ['create_user', 'get_user']);

module.exports = {
    roles,
    rolePermissions
}