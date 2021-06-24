const jwt = require('jsonwebtoken');

function generateAccessToken(id, email, type, role, companyId, customerId) {
    const payload = {
        id,
        email,
        type,
        role,
        companyId,
        customerId
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "30d" });
}

module.exports = {
    generateAccessToken
}