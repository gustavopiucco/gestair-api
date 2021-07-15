const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM schedules WHERE id = ?', [id]);
    return result.length > 0;
}

async function dateRangeExists(startDate, endDate) {
    const result = await mysql.execute('SELECT 1 FROM schedules WHERE (? >= start_date AND ? <= end_date) OR (? >= start_date AND ? <= end_date)', [startDate, startDate, endDate, endDate]);
    return result.length > 0;
}

async function getById(id) {
    const result = await mysql.execute('SELECT * FROM schedules WHERE id = ?', [id]);
    return result[0];
}

async function create(startDate, endDate, activityId) {
    const connection = await mysql.getConnection();

    try {
        await connection.beginTransaction();
        await connection.execute('INSERT INTO schedules (start_date, end_date, activity_id) VALUES (?, ?, ?)', [startDate, endDate, activityId]);
        await connection.commit();
    }
    catch (err) {
        await connection.rollback()
        throw err;
    }
    finally {
        await connection.release();
    }
}

module.exports = {
    exists,
    dateRangeExists,
    getById,
    create
}