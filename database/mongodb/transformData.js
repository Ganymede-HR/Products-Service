const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const client = require('./index.js');
const { Product, Style } = require('./models.js');

const db = mongoose.connection;


async function transformData() {
  try {
    db.on('error', console.error.bind(console, 'MongoDB Connection error:'));
    db.once('open', async () => {
      const csvFiles = ['product.csv', 'features.csv', 'related.csv'];

      for (const csvFile of csvFiles) {
        const filePath = path.resolve(`database/data/${csvFile}`);

        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', async (data) => {
            console.log(data);
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
