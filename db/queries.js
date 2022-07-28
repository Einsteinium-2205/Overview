const { promisedClient } = require('./database');

const findAllProduct = () => (
  promisedClient
    .query('SELECT * FROM product')
    .then((productData) => {
      console.log('successfully retrieved all products!');
      return productData.rows;
    })
    .catch((err) => console.log('error in DB: ', err))
);

const findProductById = (id) => (
  promisedClient
    .query(`SELECT * FROM product WHERE id = ${id}`)
    .then((productData) => {
      console.log(`successfully retrieved product with id:${id}`);
      return productData.rows[0];
    })
    .catch((err) => console.log('error in DB: ', err))
);

const findFeatureById = (id) => (
  promisedClient
    .query(`SELECT * FROM feature WHERE product_id = ${id}`)
    .then((featureData) => {
      console.log(`successfully retrieved features with id:${id}`);
      return featureData.rows;
    })
    .catch((err) => console.log('error in DB: ', err))
);

const findStylesById = (id) => (
  promisedClient
    .query(`SELECT * FROM feature WHERE product_id = ${id}`)
    .then((featureData) => {
      console.log(`successfully retrieved features with id:${id}`);
      return featureData.rows;
    })
    .catch((err) => console.log('error in DB: ', err))
);

module.exports = {
  findAllProduct,
  findProductById,
  findFeatureById,
  findStylesById,
};
