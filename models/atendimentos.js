const moment = require('moment');
const conexao = require('../infrastructure/conexao');

class Atendimento {
    adiciona(atendimento, res)
    {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const atendimentoDatado = {... atendimento, dataCriacao, data};

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros)
            res.status(400).json(erros);
        else
        {
            const sql = 'INSERT INTO Atendimentos SET ?';
    
            conexao.query(sql, atendimentoDatado, (err, resultado) => {
                if(err)
                    res.status(400).json(err);
                else
                    res.status(201).json(resultado);
            });
        }

    }

    lista(res)
    {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (err, resultados) => {
            if(err)
                res.status(400).json(err);
            else {
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res)
    {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        conexao.query(sql, (err, resultados) => {
            const atendimento = resultados[0];

            if(err)
                res.status(400).json(err);
            else {
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res)
    {
        if(valores.data)
        {
            const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
            valores.data = data;
        }
        
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';

        conexao.query(sql, [valores, id], (err, resultados) => {
            if(err)
                res.status(400).json(err);
            else {
                res.status(200).json(resultados);
            }
        });
    }
}

module.exports = new Atendimento;