const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM schedules WHERE id = ?', [id]);
    return result.length > 0;
}

async function getById(id) {
    const result = await mysql.execute('SELECT * FROM schedules WHERE id = ?', [id]);
    return result[0];
}

async function create(startDate, endDate, activityId) {
    await mysql.execute('INSERT INTO schedules (start_date, end_date, activity_id) VALUES (?, ?, ?)', [startDate, endDate, activityId]);
}

module.exports = {
    exists,
    getById,
    create
}