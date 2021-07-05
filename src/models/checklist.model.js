const mysql = require('../database/mysql');

async function getAllByActivityId(id) {
    const result = await mysql.execute('SELECT id, name, value_type AS valueType, min_value AS minValue, max_value AS `maxValue`, done FROM checklists WHERE activity_id = ?', [id]);
    return result;
}

async function create(name, valueType, minValue, maxValue, done, maintenancePlansActivityId) {
    const result = await mysql.execute('INSERT INTO checklists (name, value_type, min_value, max_value, done, activity_id) VALUES (?, ?, ?, ?, ?, ?)', [name, valueType, minValue, maxValue, done, maintenancePlansActivityId]);
    return result;
}

async function remove(id) {
    await mysql.execute('DELETE FROM checklists WHERE id = ?', [id]);
}

module.exports = {
    getAllByActivityId,
    create,
    remove
}