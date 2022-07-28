require('dotenv').config();
const Promise = require('bluebird');
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
})

const connectDb = async () => {
  try {
    await client.connect();
    console.log('DB connected!! 👌')
    // await client.end();
  } catch(err) {
    console.log('error in db connection: ', err);
  }
}

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
      );`
    );

    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS feature (
        id INT NOT NULL PRIMARY KEY,
        product_id INT NOT NULL,
        feature VARCHAR(50) NOT NULL,
        value VARCHAR(50) NOT NULL,
        FOREIGN KEY (product_id) REFERENCES product (id)
      );`
    );
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS style (
        id INT NOT NULL PRIMARY KEY,
        productId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        sale_price VARCHAR(255) NOT NULL,
        original_price VARCHAR(255) NOT NULL,
        default_style VARCHAR(255) NOT NULL,
        FOREIGN KEY (productId) REFERENCES product (id)
      );`
    );
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS sku (
        id INT NOT NULL PRIMARY KEY,
        styleId INT NOT NULL,
        size VARCHAR(255) NOT NULL,
        quantity VARCHAR(255) NOT NULL,
        FOREIGN KEY (styleId) REFERENCES style (id)
      );`
    );
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS photo (
        id INT NOT NULL PRIMARY KEY,
        styleId INT NOT NULL,
        url VARCHAR(99999) NOT NULL,
        thumbnail_url VARCHAR(99999) NOT NULL,
        FOREIGN KEY (styleId) REFERENCES style (id)
      );`
    );
    promisedClient.query(`
      CREATE TABLE IF NOT EXISTS review (
        id INT NOT NULL PRIMARY KEY,
        product_id INT NOT NULL,
        rating INT NOT NULL,
        date VARCHAR(255) NOT NULL,
        summary VARCHAR(2000) NOT NULL,
        body VARCHAR(99999) NOT NULL,
        recommend BOOLEAN NOT NULL,
        reported BOOLEAN NOT NULL,
        reviewer_name VARCHAR(600) NOT NULL,
        reviewer_email VARCHAR(2000) NOT NULL,
        response VARCHAR(600),
        helpfulness INT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES product (id)
      );`
    );
  })
  .then(() => console.log('tables has been created!'))
  .catch((err) => console.log('error: ', err))

  const addToProduct = (obj) => {
    return promisedClient.query(`
      INSERT INTO product (product_id, name, slogan, description, category, default_price)
      VALUES (${obj.product_id}, ${obj.name}, ${obj.slogan}, ${obj.description}, ${obj.category}, ${obj.default_price});
    `)
      .then(() => console.log('inserted to product table ✅'))
      .catch((err) => console.log('error when adding to product table: ', err));
  }


module.exports = { addToProduct };