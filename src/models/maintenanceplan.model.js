const mysql = require('../database/mysql');

async function create(name, startDate, endDate, companyId) {
    await mysql.execute('INSERT INTO maintenance_plans (name, start_date, end_date, company_id) VALUES (?, ?, ?, ?)', [name, startDate, endDate, companyId]);
}

module.exports = {
    create
}