require('dotenv').config();
const Promise = require('bluebird');
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

const connectDb = async () => {
  try {
    await client.connect();
  } catch (err) {
    console.log('error in db connection: ', err);
  }
};

const db = Promise.promisifyAll(connectDb, { multiArgs: true });
const promisedClient = Promise.promisifyAll(client);

db()
  .then(() => {
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS product (
        id INT NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slogan VARCHAR(255),
        description VARCHAR(600),
        category VARCHAR(255) NOT NULL,
        default_price VARCHAR(255) NOT NULL
      );`);

    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS feature (
        id INT NOT NULL PRIMARY KEY,
        product_id INT NOT NULL,
        feature VARCHAR(50) NOT NULL,
        value VARCHAR(50) NOT NULL,
        FOREIGN KEY (product_id) REFERENCES product (id)
      );`);
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS style (
        id INT NOT NULL PRIMARY KEY,
        productId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        sale_price VARCHAR(255),
        original_price VARCHAR(255) NOT NULL,
        default_style VARCHAR(255) NOT NULL,
        FOREIGN KEY (productId) REFERENCES product (id)
      );`);
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS sku (
        id INT NOT NULL PRIMARY KEY,
        styleId INT NOT NULL,
        size VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (styleId) REFERENCES style (id)
      );`);
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS photo (
        id INT NOT NULL PRIMARY KEY,
        styleId INT NOT NULL,
        url VARCHAR(99999) NOT NULL,
        thumbnail_url VARCHAR(99999) NOT NULL,
        FOREIGN KEY (styleId) REFERENCES style (id)
      );`);
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS related (
        id INT NOT NULL PRIMARY KEY,
        current_product_id INT NOT NULL,
        related_product_id INT NOT NULL,
        FOREIGN KEY (current_product_id) REFERENCES product (id)
      );`);
  })
  .then(() => {
    // clean & transform data
    promisedClient.query(`
      UPDATE style SET sale_price = REPLACE(
        sale_price, 'null', null
    );`);
  })
  .then(() => console.log('DB connected!! 👌'))
  .catch((err) => console.log('error: ', err));

module.exports = { promisedClient };
