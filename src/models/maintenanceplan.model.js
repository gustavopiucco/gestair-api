const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM maintenance_plans WHERE id = ?', [id]);
    return rows.length > 0;
}

async function equipmentIdExists(equipmentId) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM maintenance_plans WHERE equipment_id = ?', [equipmentId]);
    return rows.length > 0;
}

async function getById(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM maintenance_plans WHERE id = ?', [id]);
    return rows[0];
}

async function getAllByCompanyId(companyId) {
    const [rows, fields] = await mysql.pool.execute('SELECT id, name, equipment_id FROM maintenance_plans WHERE company_id = ?', [companyId]);
    return rows;
}

async function create(name, companyId, equipmentId, userId) {
    await mysql.pool.execute('INSERT INTO maintenance_plans (name, company_id, equipment_id, user_id) VALUES (?, ?, ?, ?)', [name, companyId, equipmentId, userId]);
}

module.exports = {
    exists,
    equipmentIdExists,
    getById,
    getAllByCompanyId,
    create
}