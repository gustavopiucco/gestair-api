const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM enviroments WHERE id = ?', [id]);
    return rows.length > 0;
}

async function getAllEnviromentsByUnitId(unitId) {
    const [rows, fields] = await mysql.pool.execute('SELECT id, name, floor, area, activity_type AS activityType, fixed_occupants AS fixedOccupants, floating_occupants AS floatingOccupants, thermal_load AS thermalLoad, unit_id as unitId FROM enviroments WHERE unit_id = ?', [unitId]);
    return rows;
}

async function create(name, floor, area, activityType, fixedOccupants, floatingOccupants, thermalLoad, unitId) {
    await mysql.pool.execute('INSERT INTO enviroments (name, floor, area, activity_type, fixed_occupants, floating_occupants, thermal_load, unit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, floor, area, activityType, fixedOccupants, floatingOccupants, thermalLoad, unitId]);
}

module.exports = {
    exists,
    getAllEnviromentsByUnitId,
    create
}