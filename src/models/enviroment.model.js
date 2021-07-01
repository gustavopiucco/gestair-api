const mysql = require('../database/mysql');

async function getAllEnviromentsByUnitId(unitId) {
    const result = await mysql.execute('SELECT name, floor, area, activity_type AS activityType, fixed_occupants AS fixedOccupants, floating_occupants AS floatingOccupants, thermal_load AS thermalLoad, unit_id as unitId FROM enviroments WHERE unit_id = ?', [unitId]);
    return result;
}

async function create(name, floor, area, activityType, fixedOccupants, floatingOccupants, thermalLoad, unitId) {
    await mysql.execute('INSERT INTO enviroments (name, floor, area, activity_type, fixed_occupants, floating_occupants, thermal_load, unit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, floor, area, activityType, fixedOccupants, floatingOccupants, thermalLoad, unitId]);
}

module.exports = {
    getAllEnviromentsByUnitId,
    create
}