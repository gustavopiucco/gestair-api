const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM schedules WHERE id = ?', [id]);
    return rows.length > 0;
}

async function dateRangeExists(connection, startDate, endDate) {
    const [rows, fields] = await connection.execute('SELECT * FROM schedules WHERE (? >= start_date AND ? <= end_date) OR (? >= start_date AND ? <= end_date)', [startDate, startDate, endDate, endDate]);
    return rows.length > 0;
}

async function getById(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM schedules WHERE id = ?', [id]);
    return rows[0];
}

async function create(startDate, endDate, activityId, connection) {
    const sql = 'INSERT INTO schedules (start_date, end_date, activity_id) VALUES (?, ?, ?)';
    const values = [startDate, endDate, activityId]

    if (connection)
        await connection.execute(sql, values);
    else {
        await mysql.pool.execute(sql, values);
    }
}

module.exports = {
    exists,
    dateRangeExists,
    getById,
    create
}