const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

let productData = [];
const parser = parse({columns: true}, (err, records) => {
  if (err) {
    console.log('err in parser: ', err)
  } else {
    // console.log('records: ', records);
    productData = records;
  }
})

fs.createReadStream(path.join(__dirname +'/data/product.csv')).pipe(parser);

console.log(productData);