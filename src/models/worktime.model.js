const mysql = require('../database/mysql');

async function workTimeExists(userId, weekDay, workFrom, workTo) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM work_time WHERE user_id = ? AND week_day = ? AND work_from = ? and work_to = ?', [userId, weekDay, workFrom, workTo]);
    return rows.length > 0;
}

async function workTimeIntervalExists(userId, weekDay, workFrom, workTo) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM work_time WHERE user_id = ? AND week_day = ? AND ? BETWEEN work_from AND work_to OR ? BETWEEN work_from AND work_to', [userId, weekDay, workFrom, workTo]);
    return rows.length > 0;
}

async function getWorkTimeById(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM work_time WHERE id = ?', [id]);
    return rows[0];
}

async function getWorkTimeByUserId(userId) {
    const [rows, fields] = await mysql.pool.execute('SELECT id, week_day, work_from, work_to FROM work_time WHERE user_id = ?', [userId]);
    return rows;
}

async function createUserWorkTime(id, weekDay, workFrom, workTo) {
    await mysql.pool.execute('INSERT INTO work_time (user_id, week_day, work_from, work_to) VALUES (?, ?, ?, ?)', [id, weekDay, workFrom, workTo]);
}

async function deleteWorkTime(id) {
    await mysql.pool.execute('DELETE FROM work_time WHERE id = ?', [id]);
}

module.exports = {
    workTimeExists,
    workTimeIntervalExists,
    getWorkTimeById,
    getWorkTimeByUserId,
    createUserWorkTime,
    deleteWorkTime
}