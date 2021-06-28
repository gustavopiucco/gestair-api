const roles = ['admin', 'company_manager', 'company_unit_manager'];

const rolePermissions = new Map();

rolePermissions.set(roles[0],
    [
        'create_user',
        'get_user',
        'admin_create_company',
        'create_unit',
        'update_user',
        'update_user_company',
        'update_user_customer',
        'create_work_time',
        'get_work_time',
        'delete_work_time',
        'get_all_users_by_company',
        'create_maintenance_plan'
    ]);
rolePermissions.set(roles[1],
    [
        'get_user',
        'create_customer',
        'update_user',
        'update_user_customer',
        'update_user_company',
        'create_work_time',
        'delete_work_time',
        'get_work_time',
        'get_all_users_by_company',
        'create_maintenance_plan'
    ]);
rolePermissions.set(roles[2],
    [
        'create_unit'
    ]);

module.exports = {
    roles,
    rolePermissions
}