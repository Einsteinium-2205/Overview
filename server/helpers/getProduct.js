const {
  findAllProduct,
  findProductById,
  findFeatureById,
  findStylesById,
  findPhotosByStyleid,
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

const getStyleById = (req, res) => {
  const id = req.url.slice(10, -7);

  findStylesById(id)
    .then((styleData) => {
      const styleObj = {};
      styleObj.product_id = styleData[0].productid;
      styleObj.results = styleData;
      // return styleObj;
      const photoPromises = styleObj.results.map((style) => (
        findPhotosByStyleid(style.id)
          .then((photoData) => {
            style.photos = photoData;
          })
          .catch((err) => console.log('error in findPhotos: ', err))
      ));
      const result = Promise.all(photoPromises);
      return result.then(() => (styleObj));

      // findPhotosByStyleid(styleData[0].id)
      //   .then((photoData) => {
      //     styleObj[0].photos = photoData;
      //     // console.log('styleObj: ', styleObj);

      //     return styleObj;
      //   })
      //   .then((finalStyleObj) => res.status(200).send(finalStyleObj));
    })
    .then((finalStyleObj) => res.status(200).send(finalStyleObj))
    .catch((err) => {
      res.status(500).send(err);
      console.log('error in getStyleById: ', err);
    });
};

module.exports = { getAllProduct, getProductById, getStyleById };
