require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./database/index');
const productRouter = require('./productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/products', productRouter);

app.listen(PORT, () => {
  console.log(`Listening on localhost, port: ${PORT}`);
});

// test connection
async function test() {
  try {
    await db.connect();
    console.log('Connected');
  } catch (err) {
    console.log(err);
  }
}
test();
