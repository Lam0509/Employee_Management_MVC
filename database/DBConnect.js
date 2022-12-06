const mysql = require('mysql')

const DBConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'lam050901',
    database: 'employee_management',
})

module.exports = DBConnection;