const mysql = require('../database/mysql');

async function emailExists(email) {
    const result = await mysql.execute('SELECT 1 FROM users WHERE email = ?', [email]);
    return result.length > 0;
}

async function getUserById(userId) {
    const result = await mysql.execute('SELECT * FROM users WHERE id = ?', [userId]);
    return result[0];
}

async function getUserByEmail(email) {
    const result = await mysql.execute('SELECT * FROM users WHERE email = ?', [email]);
    return result[0];
}

async function createUser(email, passwordHash, firstName, lastName, cpf, phone) {
    await mysql.execute('INSERT INTO users (email, password_hash, first_name, last_name, cpf, phone) VALUES (?, ?, ?, ?, ?, ?)', [email, passwordHash, firstName, lastName, cpf, phone]);
}

async function updateUser(id, type, role, companyId) {
    await mysql.execute('UPDATE users SET type = ?, role = ?, company_id = ? WHERE id = ?', [type, role, companyId, id]);
}

module.exports = {
    emailExists,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser
}