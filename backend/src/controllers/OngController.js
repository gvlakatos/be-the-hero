const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*'); // Instrução para retornar todos registros

        return response.json(ongs);
    },

    async create(request, response) {
        // Desestruturação dos dados para pegar cada um dos dados em variável
        const { name, email, whatsapp, city, uf} = request.body;

        // Gera ID da ONG de forma randomica
        const id = crypto.randomBytes(4).toString('HEX');

        // Async-await: defino minha requisição como asincrona (colocando 'async' no request), assim que a requisição chegar na função 'await', 
        // ela irá aguardar o código finalizar para executar o return
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};