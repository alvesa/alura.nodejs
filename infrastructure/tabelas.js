class Tabelas {
    init(conexao) 
    {
        this.conexao = conexao;

        this.criarAtendimentos();
    }

    criarAtendimentos()
    {
        const sql = 'CREATE TABLE Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente VARCHAR(50) NOT NULL, pet VARCHAR(20), servico VARCHAR(20) NOT NULL, status VARCHAR(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        this.conexao.query(sql, (err, ) =>{
            if(err)
                console.log(err);
            else {
                console.log('tabela Atendimentos criada com sucesso.')
            }
        });
    }
}

module.exports = new Tabelas;