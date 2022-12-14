const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const userModel = require('../models/user.model');
const workTimeModel = require('../models/worktime.model');

async function getWorkTimeById(id) {
    const workTime = await workTimeModel.getWorkTimeById(id);

    if (!workTime) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este ID de carga horária não existe');
    }

    return workTime;
}

async function getWorkTimeQuery(query) {
    let workTime;

    if (query.userId) {
        workTime = await workTimeModel.getWorkTimeByUserId(query.userId);
    }

    if (workTime.length == 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Nenhuma carga horária definiada para este ID de usuário');
    }

    return workTime;
}

async function createWorkTime(loggedInUser, body) {
    if (body.workFrom > '23:59' || body.workTo > '23:59') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Os horários devem ser informados entre 00:00 e 23:59');
    }

    if (body.workTo <= body.workFrom) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'O horário final não pode ser menor ou igual ao horário inicial');
    }

    if (await workTimeModel.workTimeExists(body.userId, body.weekDay, body.workFrom + ':00', body.workTo + ':00')) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Está carga horária já está cadastrada para este usuário');
    }

    if (loggedInUser.id == body.userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Você não pode alterar sua própria carga horária');
    }

    const user = await userModel.getUserById(body.userId);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Usuário com ID ${body.userId} não existe`);
    }

    //e se o usuario for do tipo customer?
    if (loggedInUser.companyId != user.company_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Este usuário não pertence a sua empresa');
    }

    await workTimeModel.createUserWorkTime(body.userId, body.weekDay, body.workFrom, body.workTo);
}

async function deleteWorkTime(id) {
    //TODO: restrições
    await workTimeModel.deleteWorkTime(id);
}

module.exports = {
    getWorkTimeById,
    getWorkTimeQuery,
    createWorkTime,
    deleteWorkTime,
}