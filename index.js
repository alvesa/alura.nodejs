const express = require('express');

const app = express();

app.get('/atendimentos', (req, res) => {
    res.send('voce esta na rota de atendimentos');
});

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000');
});