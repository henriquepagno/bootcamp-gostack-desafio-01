const express = require("express");
const routes = require("./routes");

const server = express();

//Sets express to use JSON on requests body
server.use(express.json());

server.use(routes);

//Define application port
server.listen(3333);