const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM units WHERE id = ?', [id]);
    return result.length > 0;
}

async function unitUserExists(unitId, userId) {
    const result = await mysql.execute('SELECT 1 FROM units_users WHERE unit_id = ? AND user_id = ?', [unitId, userId]);
    return result.length > 0;
}

async function getAllUnitsByCustomerId(customerId) {
    const result = await mysql.execute('SELECT id, name, floors, address, district, city, federal_unit AS federalUnit, cep FROM units WHERE customer_id = ?', [customerId]);
    return result;
}

async function getCompanyIdById(id) {
    const result = await mysql.execute(`SELECT companies.id AS company_id FROM units
    JOIN customers ON customers.id = units.customer_id
    JOIN companies ON companies.id = customers.company_id
    WHERE units.id = ?`, [id]);
    return result[0].company_id;
}

async function create(name, floors, address, district, city, federalUnit, cep, customerId) {
    await mysql.execute('INSERT INTO units (name, floors, address, district, city, federal_unit, cep, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, floors, address, district, city, federalUnit, cep, customerId]);
}

async function createUnitUserLink(unitId, userId) {
    await mysql.execute('INSERT INTO units_users (unit_id, user_id) VALUES (?, ?)', [unitId, userId]);
}

module.exports = {
    exists,
    unitUserExists,
    getAllUnitsByCustomerId,
    getCompanyIdById,
    create,
    createUnitUserLink
}