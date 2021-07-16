const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM activities WHERE id = ?', [id]);
    return rows.length > 0;
}

async function getById(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM activities WHERE id = ?', [id]);
    return rows[0];
}

async function getAllByMaintenancePlanId(maintenancePlanId) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM activities WHERE maintenance_plan_id = ?', [maintenancePlanId]);
    return rows;
}

async function create(name, frequency, time, maintenancePlanId) {
    const [rows, fields] = await mysql.pool.execute('INSERT INTO activities (name, frequency, time, maintenance_plan_id) VALUES (?, ?, ?, ?)', [name, frequency, time, maintenancePlanId]);
    return rows;
}

async function remove(id) {
    await mysql.pool.execute('DELETE FROM activities WHERE id = ?', [id]);
}

module.exports = {
    exists,
    getById,
    getAllByMaintenancePlanId,
    create,
    remove
}