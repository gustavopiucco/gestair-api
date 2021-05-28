const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const auth = (roles) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null)
        next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));

        if (!roles.includes(user.role))
            next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));

        req.user = user;

        next();
    });
}

module.exports = auth;