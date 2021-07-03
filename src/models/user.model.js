const mysql = require('../database/mysql');

async function exists(id) {
    const result = await mysql.execute('SELECT 1 FROM users WHERE id = ?', [id]);
    return result.length > 0;
}

async function emailExists(email) {
    const result = await mysql.execute('SELECT 1 FROM users WHERE email = ?', [email]);
    return result.length > 0;
}

async function cpfExists(cpf) {
    const result = await mysql.execute('SELECT 1 FROM users WHERE cpf = ?', [cpf]);
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

async function getAllUsersByCompanyId(companyId) {
    const result = await mysql.execute('SELECT * FROM users WHERE company_id = ?', [companyId]);
    return result;
}

async function getUserByCpf(cpf) {
    const result = await mysql.execute('SELECT * FROM users WHERE cpf = ?', [cpf]);
    return result[0];
}

async function createUser(email, passwordHash, firstName, lastName, cpf, phone) {
    await mysql.execute('INSERT INTO users (email, password_hash, first_name, last_name, cpf, phone) VALUES (?, ?, ?, ?, ?, ?)', [email, passwordHash, firstName, lastName, cpf, phone]);
}

async function updateUser(id, passwordHash, firstName, lastName, phone) {
    await mysql.execute('UPDATE users SET password_hash = ?, first_name = ?, last_name = ?, phone = ? WHERE id = ?', [passwordHash, firstName, lastName, phone, id]);
}

async function updateRole(id, role) {
    await mysql.execute('UPDATE users SET role = ? WHERE id = ?', [role, id]);
}

async function updateUserCompanyId(id, companyId) {
    await mysql.execute('UPDATE users SET company_id = ? WHERE id = ?', [companyId, id]);
}

async function updateUserCustomerId(id, customerId) {
    await mysql.execute('UPDATE users SET customer_id = ? WHERE id = ?', [customerId, id]);
}

module.exports = {
    exists,
    emailExists,
    cpfExists,
    getUserById,
    getUserByEmail,
    getAllUsersByCompanyId,
    getUserByCpf,
    createUser,
    updateUser,
    updateRole,
    updateUserCompanyId,
    updateUserCustomerId
}