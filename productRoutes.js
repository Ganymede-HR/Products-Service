const { Router } = require('express');

const productRouter = Router();
const {
  getProducts, getProductInfo, getStyles, getRelatedProducts,
} = require('./productControllers');

productRouter.get('/', (req, res) => {
  const { page, count } = req.params;
  getProducts(page, count)
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(404).json(err));
});

productRouter.get('/products/:product_id', (req, res) => {
  const { id } = req.params;
  getProductInfo(id)
    .then((results) => {
      console.log(results);
      res.status(200).json(results);
    })
    .catch(() => res.sendStatus(404));
});

productRouter.get('/products/:product_id/styles', (req, res) => {
  const { id } = req.params;
  getStyles(id)
    .then((results) => res.status(200).json(results))
    .catch(() => res.sendStatus(404));
});

productRouter.get('/products/:product_id/related', (req, res) => {
  const { id } = req.params;
  getRelatedProducts(id)
    .then((results) => res.status(200).json(results))
    .catch(() => res.sendStatus(404));
});

module.exports = productRouter;
