const express = require('express');
const app = express();

app.use(express.json());

const events = require('./routes/events');
app.use('/api/events', events);

module.exports = app;
