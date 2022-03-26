module.exports = (app) => {
  const pagamentoController = new app.controllers.PagamentoController(app)

  // app.get('/pagamento', (req, res) => pagamentoController.lista(req, res))
  // app.get('/pagamento/:id', (req, res) => pagamentoController.buscaPorId(req, res))
  // app.post('/pagamento', (req, res) => pagamentoController.salva(req, res))

  app.get('/pagamento', pagamentoController.lista.bind(pagamentoController))
  app.get('/pagamento/:id', pagamentoController.buscaPorId.bind(pagamentoController))
  app.post('/pagamento', pagamentoController.salva.bind(pagamentoController))
  app.delete('/pagamento/:id', pagamentoController.deleta.bind(pagamentoController))
}
