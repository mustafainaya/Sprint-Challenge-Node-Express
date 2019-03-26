const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const projectRoute = require('./routes/projectRoute');
const actionRoute = require('./routes/actionRoute');

const server = express();
const logMiddleware = logger('dev');
const securityMiddleware = helmet();
const espress = express.json();

server.use(espress, logMiddleware, securityMiddleware);

server.use('/api/projects', projectRoute);
server.use('/api/actions', actionRoute);

server.get('/', (req, res) => {
	res.send(`YOU SHaLL PASS OR MAYBE NOT`);
});

server.get('*', (req, res) => {
	res.status(404).send(`
	could not be found
	`);
});

module.exports = server;
