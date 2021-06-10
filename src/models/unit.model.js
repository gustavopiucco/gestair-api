const mysql = require('../database/mysql');

async function createUnit(name, floors) {
    await mysql.execute('INSERT INTO units (name, floors) VALUES (?, ?)', [name, floors]);
}

module.exports = {
    createUnit
}