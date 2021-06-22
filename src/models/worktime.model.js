const mysql = require('../database/mysql');

async function getWorkTimeById(id) {
    const result = await mysql.execute('SELECT * FROM work_time WHERE id = ?', [id]);
    return result[0];
}

async function createUserWorkTime(id, weekDay, workFrom, workTo) {
    await mysql.execute('INSERT INTO work_time (user_id, week_day, work_from, work_to) VALUES (?, ?, ?, ?)', [id, weekDay, workFrom, workTo]);
}

module.exports = {
    getWorkTimeById,
    createUserWorkTime,
}