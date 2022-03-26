//import app from './config/custom-express'
const app = require('./config/custom-express')()
const port = 3002

app.listen(port, function() {
  console.log(`Servidor de pé em http://localhost:${port}`)
  console.log('Para derrubar o servidor: ctrl+c')
})
