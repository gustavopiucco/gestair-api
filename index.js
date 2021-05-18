const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'gestair',
    password: 'gestair',
    database: 'gestair'
});

connection.connect();

connection.destroy();

const app = express();

app.route('/').get((req, res) => {
    res.send('ok');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});