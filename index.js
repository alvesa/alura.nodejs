const customExpress = require('./configs/customExpress');
const conexao = require('./infrastructure/conexao');

conexao.connect(err => {
    if(err)
        console.log(err);
    else {
        console.log('Conectado com sucesso.');
        
        const app = customExpress();

        app.listen(3000, () => {
            console.log('servidor rodando na porta 3000');
        });
    }  
});