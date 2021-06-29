const mysql = require('../database/mysql');

async function getMaintenancePlansByCompanyId(companyId) {
    const result = await mysql.execute('SELECT id, name, start_date, end_date FROM maintenance_plans WHERE company_id = ?', [companyId]);
    return result;
}

async function create(name, startDate, endDate, companyId) {
    await mysql.execute('INSERT INTO maintenance_plans (name, start_date, end_date, company_id) VALUES (?, ?, ?, ?)', [name, startDate, endDate, companyId]);
}

module.exports = {
    getMaintenancePlansByCompanyId,
    create
}