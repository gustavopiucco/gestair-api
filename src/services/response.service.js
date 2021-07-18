const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const responseModel = require('../models/response.model');
const checklistModel = require('../models/checklist.model');

async function create(loggedInUser, body) {
    if (!await checklistModel.exists(body.checklist_id)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Está checklist não existe');
    }

    //TODO: verificar se essa checklist pertence a empresa do loggedInUser

    await responseModel.create(body.value_type, body.value, body.checklist_id);
}

module.exports = {
    create
}