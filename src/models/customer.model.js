const mysql = require('../database/mysql');

async function cnpjExists(cnpj) {
    const result = await mysql.execute('SELECT 1 FROM customers WHERE cnpj = ?', [cnpj]);
    return result.length > 0;
}

async function getCustomerById(id) {
    const result = await mysql.execute('SELECT * FROM customers WHERE id = ?', [id]);
    return result[0];
}

async function getAllCustomersByCompanyId(companyId) {
    const result = await mysql.execute('SELECT id, company_name AS companyName, trading_name AS tradingName, cnpj FROM customers WHERE company_id = ?', [companyId]);
    return result;
}

async function createCustomer(companyName, tradingName, cnpj, companyId) {
    await mysql.execute('INSERT INTO customers (company_name, trading_name, cnpj, company_id) VALUES (?, ?, ?, ?)', [companyName, tradingName, cnpj, companyId]);
}

module.exports = {
    cnpjExists,
    getCustomerById,
    getAllCustomersByCompanyId,
    createCustomer,
}