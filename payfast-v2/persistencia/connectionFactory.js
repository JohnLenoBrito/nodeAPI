const mysql = require('mysql')

function connectionFactory() {
  return mysql.createConnection({
    user: 'root',
    password: 'caelum',
    database: 'payfast',
    host: 'localhost'
  })
}

module.exports = function() {
  return connectionFactory
}
