const express = require('express'); // Importação do módulo Express
const cors = require('cors');
const routes = require('./routes')

const app = express(); // Instanciando aplicação

// Define o formato da requisições que serão feitas
app.use(cors()); // Define quem pode acessar a aplicação
app.use(express.json());
app.use(routes);

// Definição da rota padrão da aplicação
// Recurso: termo utilizado para indicar a entidade de uma rota (ex: localhost/users -> users é o recurso)

/*
* Métodos HTTP:
* GET: buscar/listar uma informação do back-end
* POST: criar uma informação no back-end
* PUT: alterar uma informação no back-end
* DELETE: deletar uma informaçãonp no back-end
*/

/**
 * Tipos de parâmetros:
 * Query params: parâmetros nomeados enviados na rota após o "?" (utilizado em filtros, paginação)
 * Route params: parâmetros utilizados para identificar recursos
 * Request body: corpo da requisição, utilizado para criar ou alterar recursos
 *  
 * request.query = acessa os query params
 * request.params = acessa os route params
 * request.body = acessa o request body
 */

 /**
  * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
  * NoSQL: MongoDB, CouchDB, etc
  * 
  * Comunicação com banco de dados
  * Driver: SELECT * FROM users
  * Query builder: table('users').select('*').where(...)
  */


app.listen(3333); // Defino a porta que a aplicação 'ouvirá'