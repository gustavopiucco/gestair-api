const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM schedules WHERE id = ?', [id]);
    return result.length > 0;
}

async function getById(id) {
    const result = await mysql.execute('SELECT * FROM schedules WHERE id = ?', [id]);
    return result[0];
}

async function create(startDate, endDate, companyId, maintenancePlanId, userId) {
    await mysql.execute('INSERT INTO schedules (start_date, end_date, company_id, maintenance_plan_id, user_id) VALUES (?, ?, ?, ?, ?)', [startDate, endDate, companyId, maintenancePlanId, userId]);
}

module.exports = {
    exists,
    getById,
    create
}