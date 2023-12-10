const db = require('./database/index');

const getProducts = (page = 0, count = 5) => new Promise((resolve, reject) => {
  count = Number(count);
  page = Number(page);
  const query = `SELECT * FROM PRODUCTS LIMIT ? OFFSET ?`;
  db.query(query, [count, page], (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});

const getProductInfo = (id) => new Promise((resolve, reject) => {
  db.query(`
    SELECT products.*,
      JSON_ARRAYAGG(JSON_OBJECT('feature', feature, 'value', item_value)) AS features
    FROM products
    LEFT JOIN (
        SELECT product_id, feature, item_value
      FROM features
    ) AS feature_data ON products.id = feature_data.product_id
    WHERE products.id = 1
    GROUP BY products.id
    `, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      const product = results[0];
      resolve(product);
    }
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

  const query = `SELECT style_id, style_name, original_price, sale_price, default_style, photos FROM styles WHERE styles.product_id = ?`
  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      if (results.length > 0) {
        results.forEach((result) => {
          result.default_style = Boolean(!!result.default_style);
          result['default?'] = result.default_style;
          delete result.default_style;
        });
      }
      styleRes.results = results;
      resolve(styleRes);
    }
  });
});

const getRelatedProducts = (id) => new Promise((resolve, reject) => {
  const relatedRes = [];

  const query = `SELECT * FROM related_products WHERE product_id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) {
      reject(err);
    } else {
      if (results.length > 0) {
        results.forEach((result) => {
          relatedRes.push(result.related_product_id);
        });
      }
      resolve(relatedRes);
    }
  });
});

module.exports = {
  getProducts, getProductInfo, getStyles, getRelatedProducts, getSkus, getPhotos,
};
