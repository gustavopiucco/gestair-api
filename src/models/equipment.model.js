const mysql = require('../database/mysql');

async function systemTypeExists(id) {
    const result = await mysql.execute('SELECT 1 FROM system_type WHERE id = ?', [id]);
    return result.length > 0;
}

async function equipmentTypeExists(id) {
    const result = await mysql.execute('SELECT 1 FROM equipments_type WHERE id = ?', [id]);
    return result.length > 0;
}

async function capacityTypeExists(id) {
    const result = await mysql.execute('SELECT 1 FROM capacity_type WHERE id = ?', [id]);
    return result.length > 0;
}

async function brandModelExists(id) {
    const result = await mysql.execute('SELECT 1 FROM brand_model WHERE id = ?', [id]);
    return result.length > 0;
}

async function getAllEquipmentsByEnviromentId(enviromentId) {
    const result = await mysql.execute('SELECT name FROM equipments WHERE enviroment_id = ?', [enviromentId]);
    return result;
}

async function create(name, serialNumber, tag, systemTypeId, equipmentTypeId, capacityTypeId, capacityValue, brandModelId, enviromentId) {
    await mysql.execute('INSERT INTO equipments (name, serial_number, tag, system_type_id, equipment_type_id, capacity_type_id, capacity_value, brand_model_id, enviroment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, serialNumber, tag, systemTypeId, equipmentTypeId, capacityTypeId, capacityValue, brandModelId, enviromentId]);
}

module.exports = {
    systemTypeExists,
    equipmentTypeExists,
    capacityTypeExists,
    brandModelExists,
    getAllEquipmentsByEnviromentId,
    create
}