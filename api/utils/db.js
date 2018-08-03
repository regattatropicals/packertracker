const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DBHOST = process.env['RDS_HOSTNAME']
const DBUSER = process.env['RDS_USERNAME']
const DBPASS = process.env['RDS_PASSWORD']

async function initDB() {
    const initDBconnection = await mysql.createConnection({
        host                : DBHOST,
        user                : DBUSER,
        password            : DBPASS,
        multipleStatements  : true
    });
    const initDBscript = fs.readFileSync(path.resolve('api/initdb.sql'), 'utf8');
    await initDBconnection.query(initDBscript);
    await initDBconnection.end();
}

initDB();

module.exports = mysql.createPool({
    connectionLimit     : 10,
    host                : DBHOST,
    user                : DBUSER,
    password            : DBPASS,
    database            : 'ptdb'
});
