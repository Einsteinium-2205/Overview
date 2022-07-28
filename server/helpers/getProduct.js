const { findAllProduct, findProductById, findFeatureById } = require('../../db/database');

const getAllProduct = (req, res) => {
  findAllProduct()
    .then((productData) => res.status(200).send(productData))
    .catch((err) => {
      res.status(500).send(err);
      console.log('error in getAllProduct: ', err);
    })
}

const getProductById = (req, res) => {
  const id = req.url.slice(10);

  findProductById(id)
    .then((productData) => {

      findFeatureById(id)
        .then((featureData) => {
          productData['features'] = featureData;
          res.status(200).send(productData);
        })
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log('error in getProductById: ', err);
    })
}

module.exports = { getAllProduct, getProductById }