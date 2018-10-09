const express = require('express');
const app = express();

app.use(express.json());

const bars = require('./routes/bars');
app.use('/api/bars', bars);

module.exports = app;
