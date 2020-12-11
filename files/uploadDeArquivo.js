const fs = require('fs');

fs.readFile('./assets/salsicha.jpg', (err, buffer) => {
    console.log('images foi bufferizada');

    fs.writeFile('./assets/salsicha_2.jpg', buffer, (err) => {
        console.log('Imagem foi escrita');
    });
})