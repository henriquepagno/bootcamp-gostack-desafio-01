const express = require('express');
const routes = require('./routes');

const server = express();

//Indica para o express que o body das requisições utilizará JSON
server.use(express.json());

server.use(routes);

//Define a porta da aplicação
server.listen(3333);