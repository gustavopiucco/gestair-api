const mysql = require('../database/mysql');

async function cnpjExists(cnpj) {
    const result = await mysql.execute('SELECT 1 FROM companies WHERE cnpj = ?', [cnpj]);
    return result.length > 0;
}

async function createCompany(companyName, tradingName, cnpj) {
    await mysql.execute('INSERT INTO companies (company_name, trading_name, cnpj) VALUES (?, ?, ?)', [companyName, tradingName, cnpj]);
}

module.exports = {
    cnpjExists,
    createCompany
}