const model = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        res.send('voce esta na rota de atendimentos');
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        model.adiciona(atendimento);
        res.send('POST Atendimentos');
    });
};