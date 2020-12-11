const model = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        model.lista(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        model.buscaPorId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        model.adiciona(atendimento, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        model.altera(id, valores, res);
    });
};