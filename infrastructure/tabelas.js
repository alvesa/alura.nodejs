class Tabelas {
    init(conexao) 
    {
        this.conexao = conexao;

        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos()
    {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente VARCHAR(50) NOT NULL, pet VARCHAR(20), servico VARCHAR(20) NOT NULL, data DATETIME NOT NULL, dataCriacao DATETIME NOT NULL, status VARCHAR(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        this.conexao.query(sql, (err, ) =>{
            if(err)
                console.log(err);
            else {
                console.log('tabela Atendimentos criada com sucesso.')
            }
        });
    }

    criarPets()
    {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome VARCHAR(50), imagem VARCHAR(200), PRIMARY KEY (id))';

        this.conexao.query(query, err => {
            if(err)
                console.log()
            else{
                console.log('Tabela Pets criada com sucesso.');
            }
        });
    }
}

module.exports = new Tabelas;