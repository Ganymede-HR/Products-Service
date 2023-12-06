const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true }
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [
    {
      feature: String,
      value: String,
    }
  ]
  styles: [
    {
      _id: mongoose.Schema.Styles.ObjectId,
      ref: 'Styles'
    }
  ]
  related_products: [Number]
})

const styleSchema = new mongoose.Schema({
  name: String,
  original_price: Number,
  sale_price: Number,
  default?: { type: Boolean, default: false },
  photos: [
    {
      thumbnail_url: String,
      url: String
    }
  ],
  skus: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      size: String
    }
  ]
});

const Product = new mongoose.model('Product', productSchema);
const Style = new mongoose.model('Style', styleSchema)

module.exports.product = Product;
module.exports.style = Style;