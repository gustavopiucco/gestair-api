const mysql = require('../database/mysql');

async function maintenancePlanActivityExists(id) {
    const result = await mysql.execute('SELECT 1 FROM maintenance_plans_activities WHERE id = ?', [id]);
    return result.length > 0;
}

async function getMaintenancePlanActivityById(id) {
    const result = await mysql.execute('SELECT * FROM maintenance_plans_activities WHERE id = ?', [id]);
    return result[0];
}

async function getMaintenancePlansActivitiesByMaintenancePlanId(maintenancePlanId) {
    const result = await mysql.execute('SELECT id, name, frequency, time FROM maintenance_plans_activities WHERE maintenance_plan_id = ?', [maintenancePlanId]);
    return result;
}

async function createActivity(name, frequency, time, maintenancePlanId) {
    const result = await mysql.execute('INSERT INTO maintenance_plans_activities (name, frequency, time, maintenance_plan_id) VALUES (?, ?, ?, ?)', [name, frequency, time, maintenancePlanId]);
    return result;
}

async function deleteActivity(id) {
    await mysql.execute('DELETE FROM maintenance_plans_activities WHERE id = ?', [id]);
}

module.exports = {
    maintenancePlanActivityExists,
    getMaintenancePlanActivityById,
    getMaintenancePlansActivitiesByMaintenancePlanId,
    createActivity,
    deleteActivity,
}