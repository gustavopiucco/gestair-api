const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function loginWithEmailAndPassword(email, password) {
    const user = await userModel.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email ou senha incorreto');
    }
    return user;
}

function generateAccessToken(id, email, type, role) {
    const payload = {
        id,
        email,
        type,
        role
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "30d" });
}

module.exports = {
    loginWithEmailAndPassword,
    generateAccessToken
}