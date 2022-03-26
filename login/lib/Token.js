const factoryConnection = require('./factoryConnection')

class Token {
  constructor() {
    // CREATE DATABASE login;
    // CREATE TABLE token ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, valor TEXT NOT NULL );
  }

  valida(token, callback) {
    const connection = factoryConnection()

    connection.query('SELECT * FROM token WHERE valor=?', [token], (err, result, fields) => {
      if(result.length) {
        callback(true)
      } else {
        callback(false)
      }
    })

    connection.end()
  }

  registra(token) {
    const connection = factoryConnection()

    connection.query('INSERT INTO token SET ?', {valor: token}, (err, result, fields) => {
      if(!err) console.log('Gravado o token')
    })

    connection.end()
  }
}

module.exports = Token
