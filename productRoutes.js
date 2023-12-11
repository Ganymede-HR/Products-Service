const { Router } = require('express');

const productRouter = Router();

const {
  getProducts, getProductInfo, getStyles, getRelatedProducts, getSkus, getPhotos,
} = require('./productModels');

productRouter.get('/', (req, res) => {
  const { page, count } = req.query;
  getProducts(page, count)
    .then((results) => res.status(200).json(results))
    .catch(() => res.sendStatus(404));
});

productRouter.get('/:product_id', (req, res) => {
  const id = req.params.product_id;
  getProductInfo(id)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.sendStatus(404);
    })
});

productRouter.get('/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  getStyles(id)
    .then((results) => res.status(200).json(results))
    .catch(() => res.sendStatus(404));
});

productRouter.get('/:product_id/related', (req, res) => {
  const id = req.params.product_id;
  getRelatedProducts(id)
    .then((results) => res.status(200).json(results))
    .catch(() => res.sendStatus(404));
});

module.exports = productRouter;
