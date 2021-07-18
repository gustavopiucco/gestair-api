const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM checklists WHERE id = ?', [id]);
    return rows.length > 0;
}

async function getAllByActivityId(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT id, name, value_type, min_value, max_value, done FROM checklists WHERE activity_id = ?', [id]);
    return rows;
}

async function create(name, valueType, minValue, maxValue, done, activityId) {
    console.log(arguments)
    const [rows, fields] = await mysql.pool.execute('INSERT INTO checklists (name, value_type, min_value, max_value, done, activity_id) VALUES (?, ?, ?, ?, ?, ?)', [name, valueType, minValue, maxValue, done, activityId]);
    return rows;
}

async function remove(id) {
    await mysql.pool.execute('DELETE FROM checklists WHERE id = ?', [id]);
}

module.exports = {
    exists,
    getAllByActivityId,
    create,
    remove
}