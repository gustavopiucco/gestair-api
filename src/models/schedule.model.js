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

async function create(connection, startDate, endDate, activityId) {
    await mysql.pool.execute('INSERT INTO schedules (start_date, end_date, activity_id) VALUES (?, ?, ?)', [startDate, endDate, activityId]);
}

// async function create(startDate, endDate, activityId) {
//     const connection = await mysql.getConnection();

//     try {
//         await connection.beginTransaction();
//         await connection.execute('INSERT INTO schedules (start_date, end_date, activity_id) VALUES (?, ?, ?)', [startDate, endDate, activityId]);
//         await connection.commit();
//     }
//     catch (err) {
//         await connection.rollback()
//         throw err;
//     }
//     finally {
//         await connection.release();
//     }
// }

module.exports = {
    exists,
    dateRangeExists,
    getById,
    create
}