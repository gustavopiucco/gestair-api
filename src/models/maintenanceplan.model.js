const mysql = require('../database/mysql');

async function maintenancePlanExists(id) {
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

async function getMaintenancePlansActivitiesByMaintenancePlanId(maintenancePlanId) {
    const result = await mysql.execute('SELECT id, name, frequency, time FROM maintenance_plans_activities WHERE maintenance_plan_id = ?', [maintenancePlanId]);
    return result;
}

async function create(name, companyId) {
    await mysql.execute('INSERT INTO maintenance_plans (name, company_id) VALUES (?, ?)', [name, companyId]);
}

async function createActivity(name, frequency, time, maintenancePlanId) {
    await mysql.execute('INSERT INTO maintenance_plans_activities (name, frequency, time, maintenance_plan_id) VALUES (?, ?, ?, ?)', [name, frequency, time, maintenancePlanId]);
}

module.exports = {
    maintenancePlanExists,
    getMaintenancePlanById,
    getMaintenancePlansByCompanyId,
    getMaintenancePlansActivitiesByMaintenancePlanId,
    create,
    createActivity
}