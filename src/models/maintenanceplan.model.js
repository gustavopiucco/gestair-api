const mysql = require('../database/mysql');

async function getMaintenancePlansByCompanyId(companyId) {
    const result = await mysql.execute('SELECT id, name FROM maintenance_plans WHERE company_id = ?', [companyId]);
    return result;
}

async function create(name, companyId) {
    await mysql.execute('INSERT INTO maintenance_plans (name, company_id) VALUES (?, ?, ?, ?)', [name, companyId]);
}

module.exports = {
    getMaintenancePlansByCompanyId,
    create
}