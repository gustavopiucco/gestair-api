const mysql = require('../database/mysql');

async function getAllByActivityId(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT id, name, value_type AS valueType, min_value AS minValue, max_value AS `maxValue`, done FROM checklists WHERE activity_id = ?', [id]);
    return rows;
}

async function create(name, valueType, minValue, maxValue, done, maintenancePlansActivityId) {
    const [rows, fields] = await mysql.pool.execute('INSERT INTO checklists (name, value_type, min_value, max_value, done, activity_id) VALUES (?, ?, ?, ?, ?, ?)', [name, valueType, minValue, maxValue, done, maintenancePlansActivityId]);
    return rows;
}

async function remove(id) {
    await mysql.pool.execute('DELETE FROM checklists WHERE id = ?', [id]);
}

module.exports = {
    getAllByActivityId,
    create,
    remove
}