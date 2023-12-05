require('dotenv').config();
const mongoose = require('mongoose');

module.exports = mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
  .then(() => console.log('Database connected'));