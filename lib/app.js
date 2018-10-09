const express = require('express');
const app = express();

app.use(express.json());

const celebs = require('./routes/celebs');
app.use('/api/celebs', celebs);

module.exports = app;
