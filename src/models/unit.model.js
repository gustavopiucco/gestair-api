const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM units WHERE id = ?', [id]);
    return result.length > 0;
}

async function unitTechnicianExists(id, technicianUserId) {
    const result = await mysql.execute('SELECT 1 FROM units_technicians WHERE id = ? AND technician_user_id = ?', [id, technicianUserId]);
    return result.length > 0;
}

async function getAllUnitsByCustomerId(customerId) {
    const result = await mysql.execute('SELECT id, name, floors, address, district, city, federal_unit AS federalUnit, cep FROM units WHERE customer_id = ?', [customerId]);
    return result;
}

async function createUnit(name, floors, address, district, city, federalUnit, cep, customerId) {
    await mysql.execute('INSERT INTO units (name, floors, address, district, city, federal_unit, cep, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, floors, address, district, city, federalUnit, cep, customerId]);
}

async function createUnitTechnician(unitId, technicianUserId) {
    await mysql.execute('INSERT INTO units_technicians (unit_id, technician_user_id) VALUES (?, ?)', [unitId, technicianUserId]);
}

module.exports = {
    exists,
    unitTechnicianExists,
    getAllUnitsByCustomerId,
    createUnit,
    createUnitTechnician
}