require('dotenv').config();
const express = require('express');
const { getAllProduct, getProductById } = require('./helpers/getProduct');


const app = express();
app.use(express.json());

// routes
app.get('/products', (req, res) => {
  getAllProduct(req, res);
})

app.get('/products/:id', (req, res) => {
  getProductById(req, res);
})
app.get('/products/:id/styles', (req, res) => {

})
app.get('/products/:id/related', (req, res) => {

})

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on http://localhost:${port}`);