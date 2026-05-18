const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    // user: 'admin',
    // password: 'StrongPassword123!',
    // database: 'elegant-atmos',
    user: 'elegantatmos_leadselg',
    password: 'Ele@gan$123',
    database: 'elegantatmos_cutleads',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;