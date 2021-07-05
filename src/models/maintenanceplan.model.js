const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM maintenance_plans WHERE id = ?', [id]);
    return result.length > 0;
}

async function getMaintenancePlanById(id) {
    const result = await mysql.execute('SELECT * FROM maintenance_plans WHERE id = ?', [id]);
    return result[0];
}

async function getMaintenancePlansByCompanyId(companyId) {
    const result = await mysql.execute('SELECT id, name FROM maintenance_plans WHERE company_id = ?', [companyId]);
    return result;
}

async function getMaintenancePlansActivitiesChecklistsByMaintenancePlanActivityId(id) {
    const result = await mysql.execute('SELECT id, name, value_type AS valueType, min_value AS minValue, max_value AS `maxValue`, done FROM maintenance_plans_activities_checklists WHERE maintenance_plan_activity_id = ?', [id]);
    return result;
}

async function create(name, companyId) {
    await mysql.execute('INSERT INTO maintenance_plans (name, company_id) VALUES (?, ?)', [name, companyId]);
}

async function createActivityChecklist(name, valueType, minValue, maxValue, done, maintenancePlansActivityId) {
    const result = await mysql.execute('INSERT INTO maintenance_plans_activities_checklists (name, value_type, min_value, max_value, done, maintenance_plan_activity_id) VALUES (?, ?, ?, ?, ?, ?)', [name, valueType, minValue, maxValue, done, maintenancePlansActivityId]);
    return result;
}

async function deleteActivityChecklist(id) {
    await mysql.execute('DELETE FROM maintenance_plans_activities_checklists WHERE id = ?', [id]);
}



module.exports = {
    exists,
    getMaintenancePlanById,
    getMaintenancePlansByCompanyId,
    getMaintenancePlansActivitiesChecklistsByMaintenancePlanActivityId,
    create,
    createActivityChecklist,
    deleteActivityChecklist
}