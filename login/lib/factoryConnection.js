const mysql = require('mysql')

module.exports = () => {
  return mysql.createConnection({
    host: 'localhost',
    database: 'login',
    user: 'root',
    password: 'caelum'
  })
}
