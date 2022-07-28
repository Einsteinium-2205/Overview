require('dotenv').config();
const express = require('express');
// const path = require('path');
const { addToProduct } = require('../db/database');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on http://localhost:${port}`);