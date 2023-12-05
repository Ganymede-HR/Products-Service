const mongoose = require('mongoose');
const { Schema } = mongoose;


const styleSchema = new Schema({
  name: String,
  originalPrice: Number,
  salePrice: Number,
  defaultStyle: { type: Boolean, default: false },
  photos: [{
    thumbnail_url: String,
    url: String
  }],
  skus: [{
    _id: Schema.Types.ObjectId,
    quantity: Number,
    size: String
  }]
});

const productSchema = new Schema({
  productId: Number,
  name: { type: String, unique: true },
  slogan: String,
  description: String,
  category: String,
  defaultPrice: Number,
  features: [{
    feature: String,
    value: String,
  }],
  styles: [{
    type: Schema.Types.ObjectId,
    ref: 'Style'
  }],
  relatedProducts: [Number]
})


const Product = new mongoose.model('Product', productSchema);
const Style = new mongoose.model('Style', styleSchema)

module.exports = { Product, Style };