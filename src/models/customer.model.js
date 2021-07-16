const mysql = require('../database/mysql');

async function exists(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM customers WHERE id = ?', [id]);
    return rows.length > 0;
}

async function cnpjExists(cnpj) {
    const [rows, fields] = await mysql.pool.execute('SELECT 1 FROM customers WHERE cnpj = ?', [cnpj]);
    return rows.length > 0;
}

async function getCustomerById(id) {
    const [rows, fields] = await mysql.pool.execute('SELECT * FROM customers WHERE id = ?', [id]);
    return rows[0];
}

async function getAllCustomersByCompanyId(companyId) {
    const [rows, fields] = await mysql.pool.execute('SELECT id, company_name AS companyName, trading_name AS tradingName, cnpj FROM customers WHERE company_id = ?', [companyId]);
    return rows;
}

async function createCustomer(companyName, tradingName, cnpj, companyId) {
    await mysql.pool.execute('INSERT INTO customers (company_name, trading_name, cnpj, company_id) VALUES (?, ?, ?, ?)', [companyName, tradingName, cnpj, companyId]);
}

module.exports = {
    exists,
    cnpjExists,
    getCustomerById,
    getAllCustomersByCompanyId,
    createCustomer,
}