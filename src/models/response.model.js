const mysql = require('../database/mysql');

async function create(valueType, value, checklistId, connection) {
    const sql = 'INSERT INTO responses (value_type, value, checklist_id) VALUES (?, ?, ?)';
    const values = [valueType, value, checklistId];

    if (connection)
        await connection.execute(sql, values);
    else {
        await mysql.pool.execute(sql, values);
    }
}

module.exports = {
    create
}