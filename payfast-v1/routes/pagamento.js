module.exports = (app) => {
  const pagamentoController = new app.controllers.PagamentoController(app)

  app.get('/pagamento', pagamentoController.lista.bind(pagamentoController))
  app.get('/pagamento/:id', pagamentoController.buscaPorId.bind(pagamentoController))
  app.post('/pagamento', pagamentoController.salva.bind(pagamentoController))
}
