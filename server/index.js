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

app.get('/loaderio-aff5a5febcc5e4948e3f1db4ca6f0dfc', (req, res) => res.send('loaderio-aff5a5febcc5e4948e3f1db4ca6f0dfc'));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on port:${port}`);
