const mysql = require('../database/mysql');

async function cnpjExists(cnpj) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM companies WHERE cnpj = ?', [cnpj]);
    return rows.length > 0;
}

async function getCompanyById(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM companies WHERE id = ?', [id]);
    return rows[0];
}

async function getCompanyByCnpj(cnpj) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM companies WHERE cnpj = ?', [cnpj]);
    return rows[0];
}

async function createCompany(companyName, tradingName, cnpj) {
    await mysql.pool.execute('INSERT INTO companies (company_name, trading_name, cnpj) VALUES (?, ?, ?)', [companyName, tradingName, cnpj]);
}

async function updateCompanyById(companyId, companyName, tradingName, cnpj) {
    await mysql.pool.execute('UPDATE companies SET (companyName, tradingName, cnpj) VALUES (?, ?, ?) WHERE id = ?', companyName, tradingName, cnpj, companyId);
}

async function deleteCompanyById(companyId) {
    await mysql.pool.execute('DELETE FROM companies WHERE id = ?', companyId);
}

module.exports = {
    cnpjExists,
    getCompanyById,
    getCompanyByCnpj,
    createCompany,
    updateCompanyById,
    deleteCompanyById
}