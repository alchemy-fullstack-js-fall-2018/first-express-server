const express = require('express');
const app = express();

app.use(express.json());

const authors = require('./routes/authors');
app.use('/api/authors', authors);

module.exports = app;