const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
//const userModel = require('../models/user.model');

async function createCompany(email, password) {
    // if (await userModel.emailExists(email)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Este email já existe.')
    // }

    // const passwordHash = await bcrypt.hash(password, 8);
    // const user = await userModel.createUser(email, passwordHash);
    // return user;
}

module.exports = {
    createCompany
}