const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM units WHERE id = ?', [id]);
    return rows.length > 0;
}

async function unitUserExists(unitId, userId) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM units_users WHERE unit_id = ? AND user_id = ?', [unitId, userId]);
    return rows.length > 0;
}

async function getAllUnitsByCustomerId(customerId) {
    const [rows, fields] = await mysql.pool.execute('SELECT id, name, floors, address, district, city, federal_unit AS federalUnit, cep FROM units WHERE customer_id = ?', [customerId]);
    return rows;
}

async function getCompanyIdById(id) {
    const [rows, fields] = await mysql.pool.execute(`SELECT companies.id AS company_id FROM units
    JOIN customers ON customers.id = units.customer_id
    JOIN companies ON companies.id = customers.company_id
    WHERE units.id = ?`, [id]);
    return rows[0].company_id;
}

async function create(name, floors, address, district, city, federalUnit, cep, customerId) {
    await mysql.pool.execute('INSERT INTO units (name, floors, address, district, city, federal_unit, cep, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, floors, address, district, city, federalUnit, cep, customerId]);
}

async function createUnitUserLink(unitId, userId) {
    await mysql.pool.execute('INSERT INTO units_users (unit_id, user_id) VALUES (?, ?)', [unitId, userId]);
}

module.exports = {
    exists,
    unitUserExists,
    getAllUnitsByCustomerId,
    getCompanyIdById,
    create,
    createUnitUserLink
}