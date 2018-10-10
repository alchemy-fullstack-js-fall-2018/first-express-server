require('dotenv').config();
const { createServer } = require('http');
const app = require('./lib/app');

const port = 3034;

const server = createServer(app);

server.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Listening on ${port}`);
});
