const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const maintenancePlanModel = require('../models/maintenanceplan.model');
const userModel = require('../models/user.model');
const equipmentModel = require('../models/equipment.model');

async function getAll(loggedInUser) {
    const maintenancePlans = await maintenancePlanModel.getAllByCompanyId(loggedInUser.companyId);

    return maintenancePlans;
}

async function create(loggedInUser, body) {
    if (!await equipmentModel.exists(body.equipmentId)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Este equipamento não existe');
    }

    if (loggedInUser.companyId != await equipmentModel.getCompanyId(body.equipmentId)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Este equipamento não pertence a sua empresa');
    }

    const user = await userModel.getUserById(body.userId);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Este usuário não existe');
    }

    if (loggedInUser.role == 'company_manager' && user.role == 'company_admin') {
        throw new ApiError(httpStatus.FORBIDDEN, 'Não é possível setar um Company Admin como responsável');
    }

    if (await maintenancePlanModel.equipmentIdExists(body.equipmentId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Já existe um plano de manutenção para este equipamento');
    }

    const maintenancePlan = await maintenancePlanModel.create(body.name, loggedInUser.companyId, body.equipmentId, body.userId);

    return maintenancePlan;
}

module.exports = {
    getAll,
    create
}