const customExpress = require('./configs/customExpress');
const conexao = require('./infrastructure/database/conexao');
const tabelas = require('./infrastructure/database/tabelas');

conexao.connect(err => {
    if(err)
        console.log(err);
    else {
        console.log('Conectado com sucesso.');

        tabelas.init(conexao);
        
        const app = customExpress();

        app.listen(3000, () => {
            console.log('servidor rodando na porta 3000');
        });
    }  
});