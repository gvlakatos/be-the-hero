const knex = require('knex');
const configuration = require('../../knexfile');

// Definação do ambiente a ser utilizado
const connection = knex(configuration.development);

module.exports = connection;