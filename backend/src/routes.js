const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Desacomplamento do módulo de rotas do express em uma nova variável
const routes = express.Router();

// Rota de login
routes.post('/sessions', SessionController.create);

// Lista todas as ONGs
routes.get('/ongs', OngController.index);

// Insere nova ONG
routes.post('/ongs', OngController.create);

// Lista caso especifico
routes.get('/profile', ProfileController.index);

// Lista todos os casos
routes.get('/incidents', IncidentController.index);

// Insere novo caso
routes.post('/incidents', IncidentController.create);

// Deleta caso especifico
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;