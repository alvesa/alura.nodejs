const axios = require('axios');
const moment = require('moment');
const conexao = require('../infrastructure/database/conexao');
const repository = require('../repositories/atendimento');

class Atendimento {
    constructor()
    {
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteEhValido = tamanho => tamanho >= 5;

        this.valida = parametros => {
            return this.validacoes.filter(campo => {
                const { nome } = campo;
                const parametro = parametros[nome];

                return !campo.valido(parametro);
            })
        }

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];
    }
    adiciona(atendimento)
    {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const atendimentoDatado = {... atendimento, dataCriacao, data};

        const parametros = {
            data: {data, dataCriacao},
            cliente: atendimento.cliente.length
        }
        const erros = this.valida(parametros);
        const existemErros = erros.length;

        if(existemErros)
            return new Promise((resolve, reject) => reject(erros))
        else
        {
            return repository.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId;
                    return { ...atendimento, id };
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

        conexao.query(sql, async (err, resultados) => {
            const atendimento = resultados[0];
            const cpf = atendimento.cliente;

            if(err)
                res.status(400).json(err);
            else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);

                atendimento.cliente = data;
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
                res.status(200).json({...valores, id});
            }
        });
    }

    deleta(id, res) 
    {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';
        
        conexao.query(sql, id, (err, resultados) => {
            if(err)
                res.status(400).json(err);
            else {
                res.status(200).json({ id });
            }
        });
    }
}

module.exports = new Atendimento;