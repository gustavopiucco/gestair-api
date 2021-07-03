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

async function getCompanyIdByUnitsTechniciansUnitId(unitId) {
    const result = await mysql.execute(`SELECT customers.company_id
    FROM units_technicians
    JOIN units ON units.id = units_technicians.unit_id
    JOIN customers ON customers.id = units.customer_id
    WHERE units_technicians.unit_id = ?`, [unitId]);
    return result[0].company_id;
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
    getCompanyIdByUnitsTechniciansUnitId,
    createUnit,
    createUnitTechnician
}