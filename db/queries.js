const { promisedClient } = require('./database');

const findAllProduct = () => (
  promisedClient
    // .query('SELECT * FROM product')
    // .then((productData) => (
    //   // console.log('successfully retrieved all products!');
    //   productData.rows
    // ))
    .query('SELECT json_agg("product") FROM product')
    .then((productData) => (
      productData.rows[0].json_agg
    ))
    .catch((err) => console.log('error in DB: ', err))
);

const findProductById = (id) => (
  promisedClient
    .query(`SELECT * FROM product WHERE id = ${id};`)
    .then((productData) => (
      // console.log(`successfully retrieved product with id:${id}`);
      productData.rows[0]
    ))
    .catch((err) => console.log('error in DB: ', err))
);

const findFeatureById = (id) => (
  promisedClient
    .query(`SELECT * FROM feature WHERE product_id = ${id}`)
    .then((featureData) => (
      // console.log(`successfully retrieved features with id:${id}`);
      featureData.rows
    ))
    .catch((err) => console.log('error in DB: ', err))
);

const findProductFeatureById = (id) => (
  promisedClient
    .query(`
      SELECT p.*,
        json_agg(json_build_object(
          'feature', f.feature,
          'value', f.value
        )) features
        FROM product p
        LEFT JOIN feature f ON f.product_id = p.id
        WHERE p.id = ${id}
        GROUP BY p.id
      ;`)
    .then((productData) => (
      productData.rows[0]
    ))
    .catch((err) => console.log('error in DB: ', err))
);

const findStylesById = (id) => (
  promisedClient
    .query(`SELECT * FROM style WHERE productId = ${id}`)
    .then((styleData) => (
      // console.log(`successfully retrieved styles with id:${id}`);
      styleData.rows
    ))
    .catch((err) => console.log('error in DB: ', err))
);

const findPhotosByStyleid = (styleId) => (
  promisedClient
    .query(`SELECT * FROM photo WHERE styleid = ${styleId}`)
    .then((photoData) => (
      // console.log(`successfully retrieved photos for Style: ${styleId}`);
      photoData.rows
    ))
);

const findSkusByStyleid = (styleId) => (
  promisedClient
    .query(`SELECT * FROM sku WHERE styleid = ${styleId}`)
    .then((skuData) => (
      // console.log(`successfully retrieved skus for Style: ${styleId}`);
      skuData.rows
    ))
);

const oneQueryfindStylesById = (productId) => (
  promisedClient
    .query(`
      SELECT json_build_object(
        'product_id', p.id,
        'results',
        (SELECT json_agg(json_build_object(
          'style_id', s.id,
          'name', s.name,
          'original_price', s.original_price,
          'sale_price', s.sale_price,
          'default?', s.default_style,
          'photos', (SELECT json_agg(json_build_object(
            'thumbnail_url', ph.thumbnail_url,
            'url', ph.url
          ))
          FROM
            photo ph
          WHERE ph.styleid = s.id),

          'skus', (SELECT json_agg(json_build_object(
            'quantity', sku.quantity,
            'size', sku.size
          ))
          FROM
            sku
          WHERE sku.styleid = s.id)
        ))
        FROM
          style s
        WHERE s.productid = p.id)

      )FROM product p WHERE p.id = ${productId}
    `)
    .then((styleData) => styleData.rows[0].json_build_object)
    .catch((err) => console.log(err))
);

const findRelatedByProductId = (id) => (
  promisedClient
    .query(`SELECT * FROM related WHERE current_product_id = ${id}`)
    .then((relatedData) => (
      // console.log(`successfully retrieved related for product: ${id}`);
      relatedData.rows
    ))
);

module.exports = {
  findAllProduct,
  findProductById,
  findFeatureById,
  findProductFeatureById,
  findStylesById,
  findPhotosByStyleid,
  findSkusByStyleid,
  oneQueryfindStylesById,
  findRelatedByProductId,
};
