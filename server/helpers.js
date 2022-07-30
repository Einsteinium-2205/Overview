const {
  findAllProduct,
  findProductById,
  findFeatureById,
  findStylesById,
  findPhotosByStyleid,
  findSkusByStyleid,
  findRelatedByProductId,
  findProductFeatureById,
} = require('../db/queries');

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

  // findProductById(id)
  //   .then((productData) => {
  //     findFeatureById(id).then((featureData) => {
  //       const productObj = productData;
  //       productObj.features = featureData;
  //       res.status(200).send(productObj);
  //     });
  //   })
  findProductFeatureById(id)
    .then((productaData) => res.status(200).send(productaData))
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

      const photoPromises = styleObj.results.map((style) => {
        style.photos = null;
        style.skus = null;

        return findPhotosByStyleid(style.id)
          .then((photoData) => {
            style.photos = photoData;
          })
          .catch((err) => console.log(err));
      });

      const skuPromises = styleObj.results.map((style) => (
        findSkusByStyleid(style.id)
          .then((skuData) => {
            style.skus = skuData;
          })
          .catch((err) => console.log('error in findPhotos: ', err))
      ));

      const addPhotos = Promise.all(photoPromises);
      const addSkus = Promise.all(skuPromises);

      return addPhotos.then(() => (
        addSkus
          .then(() => (styleObj))
          .catch((err) => console.log('err in helpers: ', err))
      ));
    })
    .then((finalStyleObj) => res.status(200).send(finalStyleObj))
    .catch((err) => {
      res.status(500).send(err);
      console.log('error in getStyleById: ', err);
    });
};

const getRelatedById = (req, res) => {
  const id = req.url.slice(10, -8);

  findRelatedByProductId(id)
    .then((relatedData) => {
      const relatedArr = relatedData.map((item) => (
        item.related_product_id
      ));
      res.status(200).send(relatedArr);
    })
    .catch((err) => console.log('error in find related: ', err));
};

module.exports = {
  getAllProduct,
  getProductById,
  getStyleById,
  getRelatedById,
};
