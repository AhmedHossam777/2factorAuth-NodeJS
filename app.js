require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());


module.exports = app;