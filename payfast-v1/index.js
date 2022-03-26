const app = require('./config/custom-express')()
const port = 3001

app.listen(port, () => {
  console.log(`Servidor de pé em http://localhost:${port}`)
  console.log('Para derrubar o servidor: crtl+c')
})
