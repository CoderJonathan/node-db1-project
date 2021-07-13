const express = require("express");
const helmet = require('helmet');
const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use(accountsRouter);

server.use((err, req, res, next) => { // eslint-disable-line
	console.log(err)
	res.status(500).json({
		message: "error",
	})
})

module.exports = server;
