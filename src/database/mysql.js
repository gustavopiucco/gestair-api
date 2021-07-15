const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

async function testConnection() {
    try {
        await pool.query('SELECT 1 AS test');
    }
    catch (err) {
        throw new Error('MySQL connection failed\n' + err);
    }
}

async function getConnection() {
    return pool.getConnection();
}

async function execute(sql, values) {
    const [rows] = await pool.execute(sql, values);
    return rows;
}

module.exports = {
    testConnection,
    getConnection,
    execute
}