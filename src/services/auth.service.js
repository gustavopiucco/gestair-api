const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const tokenService = require('../services/token.service');

async function loginWithEmailAndPassword(email, password) {
    const user = await userModel.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email ou senha incorreto');
    }
    return user;
}

function generateAccessToken(username) {
    const payload = {
        username: username
    }
    return tokenService.generateAccessToken(payload);
}

module.exports = {
    loginWithEmailAndPassword,
    generateAccessToken
}