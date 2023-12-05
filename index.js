require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./database/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Listening on localhost, port: ${PORT}`)
});