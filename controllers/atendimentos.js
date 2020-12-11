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
        model.adiciona(atendimento)
            .then(atendimentoCadastrado => {
                res.status(201).json(atendimentoCadastrado);
            })
            .catch(err => res.status(400).json(err));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        model.altera(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        model.deleta(id, res);
    })
};