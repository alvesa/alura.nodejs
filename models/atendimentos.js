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

    lista()
    {
        return repository.lista();
    }

    buscaPorId(id)
    {

        return repository.buscaPorId(id)
            .then(async resultados => {
                const atendimento = resultados[0];
                const cpf = atendimento.cliente;

                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;

                return atendimento;
            });
    }

    altera(id, valores)
    {
        if(valores.data)
        {
            const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
            valores.data = data;
        }

        return repository.altera(id, valores)
            .then(valoresAtualizados => {
                return {...valoresAtualizados, id};
            });
    }

    deleta(id) 
    {
        return repository.deleta(id)
            .then(result => result);
    }
}

module.exports = new Atendimento;