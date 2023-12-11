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


const getStyles = (id) => {
  const resObj = {
    product_id: `${id}`,
    results: []
  };

  return new Promise((resolve, reject) => {
    db.query(`
    SELECT
    s.style_id,
    s.style_name AS name,
    s.original_price,
    s.sale_price,
    s.default_style,
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('thumbnail_url', thumbnail_url, 'url', url))
        FROM photos
        WHERE photos.style_id = s.style_id
    ) AS photos,
    (
      SELECT JSON_OBJECTAGG(id, JSON_OBJECT('size', size, 'quantity', quantity))
      FROM skus
      WHERE skus.product_id = s.product_id
    ) AS skus
    FROM styles AS s
    LEFT JOIN skus ON skus.product_id = s.product_id
    WHERE s.product_id = ?
    GROUP BY s.style_id, s.style_name, s.original_price, s.sale_price, s.default_style;
    `, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resObj.results = results;
        resObj.results.forEach((result) => {
          result['default?'] = Boolean(!!result.default_style);
          delete result.default_style;
        });
        resolve(resObj);
      }
    });
  });
}

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
  getProducts, getProductInfo, getStyles, getRelatedProducts,
};
