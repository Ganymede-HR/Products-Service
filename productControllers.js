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

const getSkus = (id, styleRes) => new Promise((resolve, reject) => {
  const skus = {};

  const query = `SELECT id, quantity, size FROM skus WHERE skus.product_id = ?`

  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else if (results.length > 0) {
      results.forEach((result) => {
        skus[result.id] = {
          quantity: result.quantity,
          size: result.size,
        };
      });
    }

    styleRes.results.forEach((result) => {
      result.skus = skus;
    });

    resolve(styleRes);
  });
});

const getPhotos = (id, skuResults) => new Promise((resolve, reject) => {
  const styleIds = skuResults.results.map((item) => item.id);
  const promises = [];

  styleIds.forEach((item, index) => {
    const query = `SELECT thumbnail_url, url FROM photos WHERE photos.style_id = ?`
    const promise = new Promise((innerResolve, innerReject) => {
      db.query(query, [id], (err, data) => {
        if (err) {
          innerReject(err);
        } else {
          skuResults.results[index].photos = data;
          innerResolve();
        }
      });
    });
    promises.push(promise);
  });

  Promise.all(promises)
    .then(() => {
      resolve(skuResults);
    })
    .catch((err) => {
      reject(err);
    });
});

const getStyles = (id) => new Promise((resolve, reject) => {
  const styleRes = {
    product_id: id,
    results: [],
  };

  const query = `SELECT id, style_name, original_price, sale_price, default_style, photos FROM styles WHERE styles.product_id = ?`
  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      styleRes.results = results;
      resolve(styleRes);
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
  getProducts, getProductInfo, getStyles, getRelatedProducts, getSkus, getPhotos,
};
