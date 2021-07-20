const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM equipments WHERE id = ?', [id]);
    return rows.length > 0;
}

async function getById(id){
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM equipments WHERE id = ?', [id]);
    return rows[0]
}

async function systemTypeExists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM system_types WHERE id = ?', [id]);
    return rows.length > 0;
}

async function equipmentTypeExists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM equipment_types WHERE id = ?', [id]);
    return rows.length > 0;
}

async function capacityTypeExists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM capacity_types WHERE id = ?', [id]);
    return rows.length > 0;
}

async function brandModelExists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM brand_models WHERE id = ?', [id]);
    return rows.length > 0;
}

async function maintenancePlanExists(maintenancePlanId) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM equipments WHERE maintenance_plan_id = ?', [maintenancePlanId]);
    return rows.length > 0;
}

async function getAllSystemTypes() {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM system_types');
    return rows;
}

async function getAllEquipmentTypes() {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM equipment_types');
    return rows;
}

async function getAllCapacityTypes() {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM capacity_types');
    return rows;
}

async function getAllBrandModels() {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM brand_models');
    return rows;
}

async function getAllEquipmentsByEnviromentId(enviromentId) {
    const [rows, fields] = await mysql.pool.execute('SELECT name, serial_number AS serialNumber, tag, system_type_id AS systemTypeId, equipment_type_id AS equipmentTypeId, capacity_type_id AS capatityTypeId, capacity_value AS capacityValue, brand_model_id AS brandModelId, enviroment_id AS enviromentId, maintenance_plan_id AS maintenancePlanId FROM equipments WHERE enviroment_id = ?', [enviromentId]);
    return rows;
}

async function getCompanyId(equipmentId) {
    const [rows, fields] = await mysql.pool.execute(`
    SELECT companies.id AS company_id
    FROM equipments
    JOIN enviroments ON enviroments.id = equipments.enviroment_id
    JOIN units ON units.id = enviroments.unit_id
    JOIN customers ON customers.id = units.customer_id
    JOIN companies ON companies.id = customers.company_id
    WHERE equipments.id = ?`, [equipmentId]);
    return rows[0].company_id;
}

async function getCustomerId(equipmentId) {
    const [rows, fields] = await mysql.pool.execute(`
    SELECT companies.id AS company_id
    FROM equipments
    JOIN enviroments ON enviroments.id = equipments.enviroment_id
    JOIN units ON units.id = enviroments.unit_id
    JOIN customers ON customers.id = units.customer_id
    WHERE equipments.id = ?`, [equipmentId]);
    return rows[0].customer_id;
}

async function create(name, serialNumber, tag, systemTypeId, equipmentTypeId, capacityTypeId, capacityValue, brandModelId, enviromentId) {
    await mysql.pool.execute('INSERT INTO equipments (name, serial_number, tag, system_type_id, equipment_type_id, capacity_type_id, capacity_value, brand_model_id, enviroment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, serialNumber, tag, systemTypeId, equipmentTypeId, capacityTypeId, capacityValue, brandModelId, enviromentId]);
}

// async function setMaintenancePlan(equipmentId, maintenancePlanId, connection) {
//     const sql = 'UPDATE equipments SET maintenance_plan_id = ? WHERE id = ?';
//     const values = [maintenancePlanId, equipmentId];

//     if (connection)
//         await connection.execute(sql, values);
//     else {
//         await mysql.pool.execute(sql, values);
//     }
// }

async function getEquipmentCompanyIdByEquipmentId(id) {
    const [rows, fields] = await mysql.pool.execute(`SELECT customers.company_id
    FROM equipments 
    INNER JOIN enviroments ON enviroments.id = equipments.enviroment_id
    INNER JOIN units ON units.id = enviroments.unit_id 
    INNER JOIN customers ON customers.id = units.customer_id
    WHERE equipments.id = ?`, [id])

    return rows[0].company_id;
}

module.exports = {
    exists,
    getById,
    systemTypeExists,
    equipmentTypeExists,
    capacityTypeExists,
    brandModelExists,
    maintenancePlanExists,
    getAllSystemTypes,
    getAllEquipmentTypes,
    getAllCapacityTypes,
    getAllBrandModels,
    getAllEquipmentsByEnviromentId,
    getCompanyId,
    getCustomerId,
    create,
    getEquipmentCompanyIdByEquipmentId
}