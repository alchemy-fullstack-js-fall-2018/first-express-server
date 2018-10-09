
const express = require('express');
const app = express();

app.use(express.json());

const insects = require('./routes/insects');
app.use('/api/insects', insects);

module.exports = app;
