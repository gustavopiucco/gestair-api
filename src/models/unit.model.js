const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM units WHERE id = ?', [id]);
    return result.length > 0;
}

async function unitUserExists(id, userId) {
    const result = await mysql.execute('SELECT 1 FROM units_users WHERE id = ? AND user_id = ?', [id, userId]);
    return result.length > 0;
}

async function getAllUnitsByCustomerId(customerId) {
    const result = await mysql.execute('SELECT id, name, floors, address, district, city, federal_unit AS federalUnit, cep FROM units WHERE customer_id = ?', [customerId]);
    return result;
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
    create,
    createUnitUserLink
}