require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


module.exports = app;