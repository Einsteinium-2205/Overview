require('dotenv').config();
const express = require('express');
// const path = require('path');
const {
  getAllProduct,
  getProductById,
  getStyleById,
  getRelatedById,
} = require('./helpers');

const app = express();
app.use(express.json());

// routes
app.get('/products', (req, res) => {
  getAllProduct(req, res);
});

app.get('/products/:id', (req, res) => {
  getProductById(req, res);
});
app.get('/products/:id/styles', (req, res) => {
  getStyleById(req, res);
});
app.get('/products/:id/related', (req, res) => {
  getRelatedById(req, res);
});

app.get('/loaderio-dcda3a7d6e0d5e8e65910a0251cd5a12', (req, res) => res.send('loaderio-dcda3a7d6e0d5e8e65910a0251cd5a12'));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on port:${port}`);
