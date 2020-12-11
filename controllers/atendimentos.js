const model = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        model.lista()
            .then(resultados => res.json(resultados))
            .catch(err => res.status(400).json(err));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        model.buscaPorId(id)
        .then(atendimento => res.json(atendimento))
        .catch(err => res.status(400).json(err));
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

        model.altera(id, valores)
        .then(valoresAtualizados => res.json(valoresAtualizados))
        .catch(err => res.status(400).json(err));
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        model.deleta(id)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err));
    })
};