const mysql = require('../database/mysql');

async function getAllUnitsByCustomerId(customerId) {
    const result = await mysql.execute('SELECT name, floors address, district, city, federal_unit AS federalUnit, cep FROM units WHERE customer_id = ?', [customerId]);
    return result;
}

async function createUnit(name, floors, address, district, city, federalUnit, cep, customerId) {
    await mysql.execute('INSERT INTO units (name, floors, address, district, city, federal_unit, cep, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, floors, address, district, city, federalUnit, cep, customerId]);
}

module.exports = {
    getAllUnitsByCustomerId,
    createUnit
}