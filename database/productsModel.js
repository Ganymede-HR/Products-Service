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


const Product = new mongoose.model('Product', productSchema);

module.exports = Product;