const mongoose = require('mongoose');

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

const Style = new mongoose.model('Style', styleSchema)

module.exports = Style;