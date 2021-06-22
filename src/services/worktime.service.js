const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const userModel = require('../models/user.model');
const workTimeModel = require('../models/worktime.model');

async function createUserWorkTime(body) {
    if (body.workFrom > '23:59' || body.workTo > '23:59') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Os horários devem ser informados entre 00:00 e 23:59');
    }

    if (body.workTo <= body.workFrom) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'O horário final não pode ser menor ou igual ao horário inicial');
    }

    if (await workTimeModel.workTimeExists(body.userId, body.weekDay, body.workFrom + ':00', body.workTo + ':00')) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Está carga horária já está cadastrada para este usuário');
    }

    const user = await userModel.getUserById(body.userId);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Usuário com ID ${body.userId} não existe`);
    }

    await workTimeModel.createUserWorkTime(body.userId, body.weekDay, body.workFrom, body.workTo);
}

module.exports = {
    createUserWorkTime,
}