const mysql = require('mysql2/promise');
const path = require('path');
// Esto le dice a dotenv que el archivo .env está dos niveles arriba de este archivo
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Agreguemos este console.log para verificar en la terminal que los datos cargan
console.log('✅ Conectando a la DB:', process.env.DB_DATABASE, 'con usuario:', process.env.DB_USER);

module.exports = pool;