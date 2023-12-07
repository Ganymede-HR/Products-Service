const db = require('./database/index');

const getProducts = (page = 0, count = 5) => new Promise((resolve, reject) => {
  const query = `SELECT * FROM PRODUCTS LIMIT ? OFFSET ?`;
  db.query(query, [count, page], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});

const getProductFeatures = (id) => new Promise((resolve, reject) => {
  const featureArr = [];
  const featuresQuery = `SELECT feature, item_value FROM features WHERE features.product_id = ?`;

  db.query(featuresQuery, [id], (err, results) => {
    if (err) {
      reject(err);
    } else if (results.length > 1) {
      results.forEach((feature) => featureArr.push(feature));
      resolve(featureArr);
    }
    resolve(featureArr);
  });
});

const getProductInfo = (id) => new Promise((resolve, reject) => {
  let featureArr = [];
  getProductFeatures(id)
    .then((results) => {
      featureArr = results;
    })
    .then(() => {
      const query = `SELECT * FROM products WHERE products.product_id = ?`;
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          results[0].features = featureArr;
          resolve(results[0]);
        }
      });
    });
});

const getStyles = (id) => new Promise((resolve, reject) => {
  const query = `SELECT * FROM styles JOIN skus ON styles.product_id = skus.productId WHERE styles.product_id = ?`
  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});

const getRelatedProducts = (id) => new Promise((resolve, reject) => {
  const query = `SELECT * FROM related_products WHERE product_id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});

module.exports = {
  getProducts, getProductInfo, getStyles, getRelatedProducts,
};
