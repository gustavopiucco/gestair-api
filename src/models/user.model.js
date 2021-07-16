const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM users WHERE id = ?', [id]);
    return rows.length > 0;
}

async function emailExists(email) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM users WHERE email = ?', [email]);
    return rows.length > 0;
}

async function cpfExists(cpf) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM users WHERE cpf = ?', [cpf]);
    return rows.length > 0;
}

async function getUserById(userId) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0];
}

async function getUserByEmail(email) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

async function getAllUsersByCompanyId(companyId) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM users WHERE company_id = ?', [companyId]);
    return rows;
}

async function getUserByCpf(cpf) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM users WHERE cpf = ?', [cpf]);
    return rows[0];
}

async function createUser(email, passwordHash, firstName, lastName, cpf, phone) {
    await mysql.pool.execute('INSERT INTO users (email, password_hash, first_name, last_name, cpf, phone) VALUES (?, ?, ?, ?, ?, ?)', [email, passwordHash, firstName, lastName, cpf, phone]);
}

async function updateUser(id, passwordHash, firstName, lastName, phone) {
    await mysql.pool.execute('UPDATE users SET password_hash = ?, first_name = ?, last_name = ?, phone = ? WHERE id = ?', [passwordHash, firstName, lastName, phone, id]);
}

async function updateRole(id, role) {
    await mysql.pool.execute('UPDATE users SET role = ? WHERE id = ?', [role, id]);
}

async function updateUserCompanyId(id, companyId) {
    await mysql.pool.execute('UPDATE users SET company_id = ? WHERE id = ?', [companyId, id]);
}

async function updateUserCustomerId(id, customerId) {
    await mysql.pool.execute('UPDATE users SET customer_id = ? WHERE id = ?', [customerId, id]);
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