const moment = require('moment');
const conexao = require('../infrastructure/conexao');

class Atendimento {
    adiciona(atendimento)
    {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = {... atendimento, dataCriacao, data};
        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimentoDatado, (err, res) => {
            if(err)
                console.log(err);
            else
                console.log(res);
        });
    }
}

module.exports = new Atendimento;