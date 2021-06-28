const mysql = require('../database/mysql');

async function create(name, startDate, endDate) {
    await mysql.execute('INSERT INTO maintenance_plans (name, start_date, end_date) VALUES (?, ?, ?)', [name, startDate, endDate]);
}

module.exports = {
    create
}