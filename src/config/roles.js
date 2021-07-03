const roles = ['admin', 'company_manager', 'company_technician', 'customer_manager'];

const rolePermissions = new Map();

rolePermissions.set(roles[0],
    [
        'create_user',
        'get_user',
        'admin_create_company',
        'create_unit',
        'update_user',
        'set_company_technician',
        'set_customer_manager',
        'create_work_time',
        'get_work_time',
        'delete_work_time',
        'get_all_users_by_company',
        'create_maintenance_plan',
        'get_maintenance_plans',
        'create_maintenance_plan_activity',
        'get_maintenance_plans_activities',
        'create_maintenance_plan_activity_checklist',
        'get_maintenance_plans_activities_checklists',
        'delete_maintenance_plan_activity',
        'delete_maintenance_plan_activity_checklist',
        'get_all_customers',
        'get_all_units',
        'create_enviroment',
        'get_all_enviroments',
        'create_equipment',
        'get_all_equipments',
        'set_maintenance_plan'
    ]);
rolePermissions.set(roles[1],
    [
        'get_user',
        'create_customer',
        'update_user',
        'set_customer_manager',
        'set_company_technician',
        'create_work_time',
        'delete_work_time',
        'get_work_time',
        'get_all_users_by_company',
        'create_maintenance_plan',
        'get_maintenance_plans',
        'create_maintenance_plan_activity',
        'get_maintenance_plans_activities',
        'create_maintenance_plan_activity_checklist',
        'get_maintenance_plans_activities_checklists',
        'delete_maintenance_plan_activity',
        'delete_maintenance_plan_activity_checklist',
        'get_all_customers',
        'create_unit',
        'get_all_units',
        'create_enviroment',
        'get_all_enviroments',
        'create_equipment',
        'get_all_equipments',
        'set_maintenance_plan'
    ]);
rolePermissions.set(roles[2],
    [

    ]);
rolePermissions.set(roles[3],
    [

    ]);

module.exports = {
    roles,
    rolePermissions
}