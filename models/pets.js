const conexao = require('../infrastructure/conexao');

class Pet {
    adiciona(pet, res)
    {
        const query = 'INSERT INTO Pets SET ?';
        conexao.query(query, pet, err => {
            if(err)
                res.status(400).json(err);
            else
                res.status(200).json(pet);
        });
    }
}

module.exports = new Pet;