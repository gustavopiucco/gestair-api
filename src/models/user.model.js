const mysql = require('../database/mysql');

async function emailExists(email) {
    const result = await mysql.query('SELECT 1 FROM users WHERE email = ?', [email]);
    return result.length > 0;
}

async function getUserByEmail(email) {
    const result = await mysql.query('SELECT * FROM users WHERE email = ?', [email]);
    return result[0];
}

async function createUser(email, passwordHash) {
    await mysql.query('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, passwordHash]);
}

module.exports = {
    emailExists,
    getUserByEmail,
    createUser
}