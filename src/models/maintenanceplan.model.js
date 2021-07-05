const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM maintenance_plans WHERE id = ?', [id]);
    return result.length > 0;
}

async function getById(id) {
    const result = await mysql.execute('SELECT * FROM maintenance_plans WHERE id = ?', [id]);
    return result[0];
}

async function getAllByCompanyId(companyId) {
    const result = await mysql.execute('SELECT id, name FROM maintenance_plans WHERE company_id = ?', [companyId]);
    return result;
}

async function create(name, companyId) {
    await mysql.execute('INSERT INTO maintenance_plans (name, company_id) VALUES (?, ?)', [name, companyId]);
}

module.exports = {
    exists,
    getById,
    getAllByCompanyId,
    create
}