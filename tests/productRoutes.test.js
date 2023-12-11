const productRouter = require('../productRoutes');
const axios = require('axios');

const totalRecords = 1000011;
const randomID = Math.floor((Math.random() * Math.floor(0.1 * totalRecords) + 100000));

console.log('hi: ', randomID);

const baseEndpoint = 'http://localhost:3000/products';
const productEndpoint = `${baseEndpoint}/${randomID}`;
const stylesEndpoint = `${productEndpoint}/styles`;
const relatedEndpoint = `${productEndpoint}/related`;

describe('GET /products', () => {
  test('Response status code is 200', async () => {
    try {
      const res = await axios.get(baseEndpoint);
      expect(res.status).toBe(200)
    } catch (err) {
      console.error(err)
    }
  });

  test('Response has the required fields', async () => {
    try {
      const res = await axios.get(baseEndpoint);

      res.forEach((item) => {
        const default_property = item.default_price;
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('slogan');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('default_price');
        expect(default_property).toBe('string');
      });
    } catch (err) {
      console.error(err);
    }
  })
});

test('Response data returns an array', async () => {
  try {
    const res = await axios.get(baseEndpoint)
    expect(res.toBe('array'));
  } catch (err) {
    console.error(err);
  }
});

describe('GET /products/:id', () => {
  test('Response status code is 200', async () => {
    try {
      const res = await axios.get(productEndpoint)
        .then((res) => expect(res.status).toBe(200))
    } catch (error) {
      console.error(err);
    }
  });

  test('Response has the required fields', async () => {
    try {
      const res = await axios.get(productEndpoint)

      res.forEach((item) => {
        const default_property = item.default_price;
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('slogan');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('default_price');
        expect(default_property).toBe('string');
      });
    } catch (err) {
      console.error(err)
    }
  });

  test('Response data contains a features array', async () => {
    try {
      const res = await axios.get(productEndpoint);
      expect(res.toHaveProperty('features'));
      expect(res.features).toBe('array');
    } catch (err) {
      console.error(err)
    }
  });
});

describe('GET /products/:id/styles', () => {
  test('Response status code is 200', async () => {
    try {
      const res = await axios.get(stylesEndpoint);
      expect(res.status).toBe(200);
    } catch (err) {
      console.error(err);
    }
  });

  test('Response has the required fields', async () => {
    try {
      const res = await axios.get(stylesEndpoint);
      res.forEach((item) => {
        const default_style = item["default?"];
        expect(item).toHaveProperty('style_id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('original_price');
        expect(item).toHaveProperty('sale_price');
        expect(item).toHaveProperty('default?');
        expect(default_property).toBe('boolean');
        expect(item).toHaveProperty('photos');
        expect(item.photos).toBe('array');
        expect(item).toHaveProperty('skus')
        expect(item.skus).toBe('object')
      });
    } catch (err) {
      console.error(err);
    }
  });
});

describe('GET /products/:id/related', () => {
  test('Response status code is 200', async () => {
    try {
      const res = await axios.get(relatedEndpoint);
      expect(res.status).toBe(200)
    } catch (err) {
      console.error(err);
    }
  });

  test('Response data contains a features array', async () => {
    try {
      const res = await axios.get(relatedEndpoint);
      expect(res.toHaveProperty('features'));
      expect(res.features).toBe('array');
    } catch (err) {
      console.error(err);
    }
  })
});
