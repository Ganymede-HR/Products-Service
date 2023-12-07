const productRouter = require('express').Router();
const {
  getProducts, getProductInfo, getStyles, getRelatedProducts
} = require('./productControllers');

productRouter.route('/products')
  .get((req, res) => {
    const { page, count } = req.params;
    getProducts(page, count)
      .then((results) => res.status(200).json(results))
      .catch((err) => res.sendStatus(404));
  })
  .get('/:product_id', (req, res) => {
    const { id } = req.params;
    getProductInfo(id)
      .then((results) => res.status(200).json(results))
      .catch((err) => res.sendStatus(404));
  })
  .get('/:product_id/styles', (req, res) => {
    const { id } = req.params;
    getStyles(id)
      .then((results) => res.status(200).json(results))
      .catch((err) => res.sendStatus(404));
  })
  .get('/:product_id/related', (req, res) => {
    const { id } = req.params;
    getRelatedProducts(id)
      .then((results) => res.status(200).json(results))
      .catch((err) => res.sendStatus(404));
  });

module.exports = productRouter;
