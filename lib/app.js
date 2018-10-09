const express = require('express');
const app = express();

app.use(express.json());

const creatures = require('./routes/creatures');
app.use('/api/creatures', creatures);

module.exports = app;
