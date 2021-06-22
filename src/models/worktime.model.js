const mysql = require('../database/mysql');

async function workTimeExists(userId, weekDay, workFrom, workTo) {
    const result = await mysql.execute('SELECT 1 FROM work_time WHERE user_id = ? AND week_day = ? AND work_from = ? and work_to = ?', [userId, weekDay, workFrom, workTo]);
    return result.length > 0;
}

async function workTimeIntervalExists(userId, weekDay, workFrom, workTo) {
    const result = await mysql.execute('SELECT 1 FROM work_time WHERE user_id = ? AND week_day = ? AND ? BETWEEN work_from AND work_to OR ? BETWEEN work_from AND work_to', [userId, weekDay, workFrom, workTo]);
    return result.length > 0;
}

async function getWorkTimeById(id) {
    const result = await mysql.execute('SELECT * FROM work_time WHERE id = ?', [id]);
    return result[0];
}

async function getWorkTimeByUserId(userId) {
    const result = await mysql.execute('SELECT * FROM work_time WHERE user_id = ?', [userId]);
    return result;
}

async function createUserWorkTime(id, weekDay, workFrom, workTo) {
    await mysql.execute('INSERT INTO work_time (user_id, week_day, work_from, work_to) VALUES (?, ?, ?, ?)', [id, weekDay, workFrom, workTo]);
}

module.exports = {
    workTimeExists,
    workTimeIntervalExists,
    getWorkTimeById,
    getWorkTimeByUserId,
    createUserWorkTime,
}