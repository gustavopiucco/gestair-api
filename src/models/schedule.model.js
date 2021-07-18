const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM schedules WHERE id = ?', [id]);
    return rows.length > 0;
}

async function userIdExists(scheduleId, userId) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM schedules WHERE id = ? AND user_id = ?', [scheduleId, userId]);
    return rows.length > 0;
}

async function dateRangeExists(startDate, endDate, connection) {
    const sql = 'SELECT * FROM schedules WHERE (? >= start_date AND ? <= end_date) OR (? >= start_date AND ? <= end_date)';
    const values = [startDate, startDate, endDate, endDate];

    if (connection) {
        const [rows, fields] = await connection.execute(sql, values);
        return rows.length > 0;
    }
    else {
        const [rows, fields] = await mysql.pool.execute(sql, values);
        return rows.length > 0;
    }
}

async function getById(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM schedules WHERE id = ?', [id]);
    return rows[0];
}

async function getByUserId(userId, date) {
    const [rows, fields] = await mysql.pool.execute('SELECT id, start_date, end_date, activity_id FROM schedules WHERE user_id = ? AND DATE(start_date) = ?', [userId, date]);
    return rows;
}

async function getByCompanyId(companyId, date) {
    const [rows, fields] = await mysql.pool.execute(`
    SELECT schedules.id, schedules.start_date, schedules.end_date, schedules.activity_id 
    FROM schedules 
    JOIN users ON users.id = schedules.user_id 
    WHERE users.company_id = ?
    AND DATE(schedules.start_date) = ?`, [companyId, date]
    );

    return rows;
}

async function setUserId(scheduleId, userId) {
    await mysql.pool.execute('UPDATE schedules SET user_id = ? WHERE id = ?', [userId, scheduleId]);
}

async function create(startDate, endDate, activityId, connection) {
    const sql = 'INSERT INTO schedules (start_date, end_date, activity_id) VALUES (?, ?, ?)';
    const values = [startDate, endDate, activityId];

    if (connection)
        await connection.execute(sql, values);
    else {
        await mysql.pool.execute(sql, values);
    }
}

module.exports = {
    exists,
    userIdExists,
    dateRangeExists,
    getById,
    getByUserId,
    getByCompanyId,
    setUserId,
    create
}