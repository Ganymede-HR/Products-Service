const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const { Product, Style } = require('./models.js');
const path = require('path');

const connection = mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error connecting to database ', err));

const db = mongoose.connection;

async function transformData() {
  try {
    db.on('error', console.error.bind(console, 'MongoDB Connection error:'));
    db.once('open', async () => {
      const csvFiles = ['product.csv'];

      for (const csvFile of csvFiles) {
        const filePath = path.resolve(`database/data/${csvFile}`);

        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', async (data) => {
            console.log(data.id);
            await Product.findOneAndUpdate({ productId: data.id }, data, { upsert: true });
          })
          .on('end', () => {
            console.log(`Data from ${csvFile} processed and merged into MongoDB. `);
          })
          .on('error', (err) => {
            console.error('Error: ', err);
          });
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

transformData();




module.exports = connection;