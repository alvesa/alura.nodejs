const conexao = require('../infrastructure/conexao');

class Atendimento {
    adiciona(atendimento)
    {
        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimento, (err, res) => {
            if(err)
                console.log(err);
            else
                console.log(res);
        });
    }
}

module.exports = new Atendimento;