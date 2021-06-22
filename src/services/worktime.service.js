const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const userModel = require('../models/user.model');
const workTimeModel = require('../models/worktime.model');

async function createUserWorkTime(body) {
    const user = await userModel.getUserById(body.userId);

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Usuário com ID ${body.userId} não existe`);
    }

    await workTimeModel.createUserWorkTime(body.userId, body.weekDay, body.workFrom, body.workTo);
}

module.exports = {
    createUserWorkTime,
}