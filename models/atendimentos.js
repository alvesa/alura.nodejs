const moment = require('moment');
const conexao = require('../infrastructure/conexao');

class Atendimento {
    adiciona(atendimento, res)
    {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = {... atendimento, dataCriacao, data};
        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimentoDatado, (err, resultado) => {
            if(err)
                res.status(400).json(err);
            else
                res.status(201).json(resultado);
        });
    }
}

module.exports = new Atendimento;