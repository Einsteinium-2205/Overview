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
    .query(`SELECT * FROM style WHERE productId = ${id}`)
    .then((styleData) => {
      console.log(`successfully retrieved styles with id:${id}`);
      return styleData.rows;
    })
    .catch((err) => console.log('error in DB: ', err))
);

const findPhotosByStyleid = (styleId) => (
  promisedClient
    .query(`SELECT * FROM photo WHERE styleid = ${styleId}`)
    .then((photoData) => {
      console.log(`successfully retrieved photos for Style: ${styleId}`);
      // console.log('photoData: ', photoData.rows);
      return photoData.rows;
    })
);

module.exports = {
  findAllProduct,
  findProductById,
  findFeatureById,
  findStylesById,
  findPhotosByStyleid,
};
