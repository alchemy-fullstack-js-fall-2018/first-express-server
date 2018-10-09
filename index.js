require('dotenv').config();
const { createServer } = require('http');
const app = require('./lib/app');

const port = 4567;

const server = createServer(app);

server.listen(port, () => {
});
