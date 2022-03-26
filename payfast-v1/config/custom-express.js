const express = require('express')
const load = require('express-load')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

module.exports = () => {
  const app = express()
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(expressValidator())

  load('controllers')
    .then('routes')
    .then('persistencia')
    .into(app)

  return app
}
