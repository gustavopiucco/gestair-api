const mysql = require('../database/mysql');

async function cnpjExists(cnpj) {
    const result = await mysql.execute('SELECT 1 FROM companies WHERE cnpj = ?', [cnpj]);
    return result.length > 0;
}

async function getCompanyById(id) {
    const result = await mysql.execute('SELECT * FROM companies WHERE id = ?', [id]);
    return result[0];
}

async function getCompanyByCnpj(cnpj) {
    const result = await mysql.execute('SELECT * FROM companies WHERE cnpj = ?', [cnpj]);
    return result[0];
}

async function createCompany(companyName, tradingName, cnpj) {
    await mysql.execute('INSERT INTO companies (company_name, trading_name, cnpj) VALUES (?, ?, ?, ?)', [companyName, tradingName, cnpj]);
}

async function updateCompanyById(companyId, companyName, tradingName, cnpj) {
    await mysql.execute('UPDATE companies SET (companyName, tradingName, cnpj) VALUES (?, ?, ?) WHERE id = ?', companyName, tradingName, cnpj, companyId);
}

async function deleteCompanyById(companyId) {
    await mysql.execute('DELETE FROM companies WHERE id = ?', companyId);
}

module.exports = {
    cnpjExists,
    getCompanyById,
    getCompanyByCnpj,
    createCompany,
    updateCompanyById,
    deleteCompanyById
}