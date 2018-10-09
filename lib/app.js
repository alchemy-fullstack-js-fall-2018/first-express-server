const express = require('express');
const app = express();

app.use(express.json());

const albums = require('./routes/albums');
app.use('/api/albums', albums);

module.exports = app;
