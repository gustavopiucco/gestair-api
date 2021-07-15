const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM activities WHERE id = ?', [id]);
    return result.length > 0;
}

async function getById(id) {
    const result = await mysql.execute('SELECT * FROM activities WHERE id = ?', [id]);
    return result[0];
}

async function getAllByMaintenancePlanId(maintenancePlanId) {
    const result = await mysql.execute('SELECT * FROM activities WHERE maintenance_plan_id = ?', [maintenancePlanId]);
    return result;
}

async function create(name, frequency, time, maintenancePlanId) {
    const result = await mysql.execute('INSERT INTO activities (name, frequency, time, maintenance_plan_id) VALUES (?, ?, ?, ?)', [name, frequency, time, maintenancePlanId]);
    return result;
}

async function remove(id) {
    await mysql.execute('DELETE FROM activities WHERE id = ?', [id]);
}

module.exports = {
    exists,
    getById,
    getAllByMaintenancePlanId,
    create,
    remove
}