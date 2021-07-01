const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const enviromentModel = require('../models/enviroment.model');
const unitModel = require('../models/unit.model');

async function getAllEnviromentsByUnitId(unitId) {
    const enviroments = await enviromentModel.getAllEnviromentsByUnitId(unitId);

    return enviroments;
}

async function create(body) {
    if (!await unitModel.exists(body.unitId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Está unidade não existe');
    }

    const enviroment = await enviromentModel.create(body.name, body.floor, body.area, body.activityType, body.fixedOccupants, body.floatingOccupants, body.thermalLoad, body.unitId);

    return enviroment;
}

module.exports = {
    getAllEnviromentsByUnitId,
    create
}