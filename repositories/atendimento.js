const query = require('../infrastructure/database/queries');

class Atendimento {
    adiciona(atendimento)
    {
        const sql = 'INSERT INTO Atendimentos SET ?';
        return query(sql, atendimento);
    }

    lista()
    {
        const sql = 'SELECT * FROM Atendimentos';

        return query(sql);
    }

    buscaPorId(id)
    {
        const sql = 'SELECT * FROM Atendimentos WHERE id = ?'

        return query(sql, id);
    }

    altera(id, valores)
    {
        if(valores.data)
        {
            const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
            valores.data = data;
        }
        
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';

        return query(sql, [valores, id])
            .then(atendimento => atendimento);
    }

    deleta(id)
    {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';

        return query(sql, id)
            .then(result => result);
    }
}

module.exports = new Atendimento;