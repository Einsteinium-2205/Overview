require('dotenv').config();
const express = require('express');
// const path = require('path');
const { getAllProduct } = require('../db/database');

const app = express();
app.use(express.json());

// routes
app.get('/products', (req, res) => {

})

app.get('/products/:id', (req, res) => {

})
app.get('/products/:id/styles', (req, res) => {

})
app.get('/products/:id/related', (req, res) => {

})

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on http://localhost:${port}`);