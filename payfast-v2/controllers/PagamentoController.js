
const request = require('request')

class PagamentoController {
  constructor(app) {
    this.app = app
  }

  lista(req, res) {
    const connection = this.app.persistencia.connectionFactory()
    const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)

    pagamentoDao.lista((err, result, fields) => {
      if (!err) {
        res.json(result)
      } else {
        res.status(404).json(err)
      }
    })
  }

  buscaPorId(req, res) {
    const connection = this.app.persistencia.connectionFactory()
    const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)
    const id = req.params.id

    pagamentoDao.buscaPorId(id, (err, result, fields) => {
      if (!err) {
        res.json(result)
      } else {
        res.status(404).json(err)
      }
    })
  }

  salva(req, res) {
    const pagamento = req.body
    let errors = false
    pagamento.status = "CRIADO"
    pagamento.date = new Date

    req.assert('forma_de_pagamento', 'Chave forma_de_pagamento é obrigátoria').notEmpty()
    req.assert('valor', 'Chave valor é obrigátoria').notEmpty()
    req.assert('valor', 'Chave valor tem que ser um número decimal').isFloat()
    req.assert('moeda', 'Chave moeda é obrigatória').notEmpty()
    req.assert('moeda', 'Chave moeda deve ter 3 caracteres').len(3, 3)

    errors = req.validationErrors()

    if(!errors) {
      const connection = this.app.persistencia.connectionFactory()
      const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)

      pagamentoDao.salva(pagamento, (err, result, fields) => {
        if (!err) {
          const resposta = {
            data: pagamento,
            links: [
              {
                method: 'PUT',
                href: `http://localhost:3000/pagamento/${result.insertId}`,
                rel: 'cofirma'
              },
              {
                method: 'DELETE',
                href: `http://localhost:3000/pagamento/${result.insertId}`,
                rel: 'cancelar'
              },
              {
                method: 'GET',
                href: `http://localhost:3000/pagamento/${result.insertId}`,
                rel: 'confirma'
              },
              {
                method: 'PATCH',
                href: `http://localhost:3000/pagamento/${result.insertId}`,
                rel: 'cofirma'
              },
              {
                method: 'OPTION',
                href: `http://localhost:3000/pagamento`,
                rel: 'head'
              }
            ]
          }
          res.status(201).json(resposta)
        } else {
          err.sql = ''
          res.status(400).json(err)
        }
      })
    } else {
      res.status(400).json(errors)
    }
  }

  deleta(req, res) {
    const token = req.headers.authorization

    if(!token){
      res.status(301).json({
        msg: "Voce tem que fazer um request com a estrutura proposta no JSON que está com a chave",
        method: 'GET',
        link: 'http://localhost:3003/token/:origin',

        send:{
          header: {
            alg: 'HS256',
            typ: 'JWT'
          },
          body:{
            sub: 'payfast',
            name: 'John',
            pass: '1234',
            admin: true
          }
        }
      })

      return
    }

    request.get(`http://localhost:3003/validaToken/${token}`, (err, result) => {
      if(result.statusCode == 200){
        const id = req.params.id
        const connection = this.app.persistencia.connectionFactory()
        const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)

        pagamentoDao.deleta(id, (err, result, fields) => {
          if(!err) {
            res.json(`Produto com o id=${id} foi deletado com sucesso`)
          } else {
            res.status(404).json('Deu ruim')
          }
        })
      } else{
        res.status(401).json({msg: `Seu token não é valido: ${token}`})
      }
    })
  }
}

module.exports = function() {
  return PagamentoController
}
