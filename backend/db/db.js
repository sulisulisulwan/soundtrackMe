const mysql = require('mysql2');
require('dotenv').config({ path: __dirname + '/.env' })


const connection = mysql.createConnection({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT
})


module.exports = connection.promise();