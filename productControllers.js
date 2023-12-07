const db = require('./database/index');

const getProducts = (page = 1, count = 5) => new Promise((resolve, reject), () => {
  const query = `SELECT * FROM PRODUCTS LIMIT ? OFFSET ?`;
  db.query(query, [count, page], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});

const getProductInfo = (id) => new Promise((resolve, reject), () => {
  const query = `SELECT * FROM products JOIN features ON products.product_id = features.product_id WHERE products.product_id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});

const getStyles = (id) => new Promise((resolve, reject), () => {
  const query = `SELECT * FROM styles JOIN skus ON styles.product_id = skus.productId WHERE styles.product_id = ?`
  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});

const getRelatedProducts = (id) => {
  const query = `SELECT * FROM related_products WHERE product_id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
};

module.exports = {
  getProducts, getProductInfo, getStyles, getRelatedProducts,
};
