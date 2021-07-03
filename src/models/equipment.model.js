const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM equipments WHERE id = ?', [id]);
    return result.length > 0;
}

async function systemTypeExists(id) {
    const result = await mysql.execute('SELECT 1 FROM system_types WHERE id = ?', [id]);
    return result.length > 0;
}

async function equipmentTypeExists(id) {
    const result = await mysql.execute('SELECT 1 FROM equipment_types WHERE id = ?', [id]);
    return result.length > 0;
}

async function capacityTypeExists(id) {
    const result = await mysql.execute('SELECT 1 FROM capacity_types WHERE id = ?', [id]);
    return result.length > 0;
}

async function brandModelExists(id) {
    const result = await mysql.execute('SELECT 1 FROM brand_models WHERE id = ?', [id]);
    return result.length > 0;
}

async function getAllSystemTypes() {
    const result = await mysql.execute('SELECT * FROM system_types');
    return result;
}

async function getAllEquipmentTypes() {
    const result = await mysql.execute('SELECT * FROM equipment_types');
    return result;
}

async function getAllCapacityTypes() {
    const result = await mysql.execute('SELECT * FROM capacity_types');
    return result;
}

async function getAllBrandModels() {
    const result = await mysql.execute('SELECT * FROM brand_models');
    return result;
}

async function getAllEquipmentsByEnviromentId(enviromentId) {
    const result = await mysql.execute('SELECT name, serial_number AS serialNumber, tag, system_type_id AS systemTypeId, equipment_type_id AS equipmentTypeId, capacity_type_id AS capatityTypeId, capacity_value AS capacityValue, brand_model_id AS brandModelId, enviroment_id AS enviromentId, maintenance_plan_id AS maintenancePlanId FROM equipments WHERE enviroment_id = ?', [enviromentId]);
    return result;
}

async function getAllActivitesByMaintenancePlanId(maintenancePlanId) {
    const result = await mysql.execute('SELECT * FROM maintenance_plans_activities WHERE maintenance_plan_id = ?', [maintenancePlanId]);
    return result;
}

async function create(name, serialNumber, tag, systemTypeId, equipmentTypeId, capacityTypeId, capacityValue, brandModelId, enviromentId) {
    await mysql.execute('INSERT INTO equipments (name, serial_number, tag, system_type_id, equipment_type_id, capacity_type_id, capacity_value, brand_model_id, enviroment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, serialNumber, tag, systemTypeId, equipmentTypeId, capacityTypeId, capacityValue, brandModelId, enviromentId]);
}

async function setMaintenancePlan(id, maintenancePlanId) {
    await mysql.execute('UPDATE equipments SET maintenance_plan_id = ? WHERE id = ?', [maintenancePlanId, id]);
}

async function getEquipmentCompanyIdByEquipmentId(id){
  const result =  await mysql.execute(`SELECT customers.company_id
  FROM equipments 
  INNER JOIN enviroments ON enviroments.id = equipments.enviroment_id
  INNER JOIN units ON units.id = enviroments.unit_id 
  INNER JOIN customers ON customers.id = units.customer_id
  WHERE equipments.id = ?
  `,[id])
  
  return result;
}

module.exports = {
    exists,
    systemTypeExists,
    equipmentTypeExists,
    capacityTypeExists,
    brandModelExists,
    getAllSystemTypes,
    getAllEquipmentTypes,
    getAllCapacityTypes,
    getAllBrandModels,
    getAllEquipmentsByEnviromentId,
    getAllActivitesByMaintenancePlanId,
    create,
    setMaintenancePlan,
    getEquipmentCompanyIdByEquipmentId
}