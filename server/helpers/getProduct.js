const {
  findAllProduct,
  findProductById,
  findFeatureById,
} = require('../../db/queries');

const getAllProduct = (req, res) => {
  findAllProduct()
    .then((productData) => res.status(200).send(productData))
    .catch((err) => {
      res.status(500).send(err);
      console.log('error in getAllProduct: ', err);
    });
};

const getProductById = (req, res) => {
  const id = req.url.slice(10);

  findProductById(id)
    .then((productData) => {
      findFeatureById(id).then((featureData) => {
        const productObj = productData;
        productObj.features = featureData;
        res.status(200).send(productData);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log('error in getProductById: ', err);
    });
};

module.exports = { getAllProduct, getProductById };
