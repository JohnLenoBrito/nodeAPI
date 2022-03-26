const Token = require('./lib/Token')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3003

app.get('/validaToken/:token', (req, res) => {
  const token = new Token()
  const tokenPam = req.params.token
  const host = req.headers.host

  token.valida(tokenPam, (result) => {
    if(result && host == 'localhost:3003') {
      res.json({msg: 'Token valido'})
    } else {
      res.status(500).json({msg: 'Token invalido'})
    }
  })
})

app.listen(port, () => {
  console.log(`Servidor de pé em http://localhost:${port}`)
  console.log('Para derrubar o servidor: ctrl+c')
})
