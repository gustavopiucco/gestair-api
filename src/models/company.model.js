const mysql = require('../database/mysql');

async function createCompany(name) {
    await mysql.execute('INSERT INTO companies (name) VALUES (?)', [name]);
}

module.exports = {
    createCompany
}