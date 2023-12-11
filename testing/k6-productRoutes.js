import http from 'k6/http';
import { sleep } from 'k6';

const totalRecords = 1000011;
const randomID = Math.floor((Math.random() * Math.floor(0.1 * totalRecords) + 100000));

const baseEndpoint = 'http://localhost:3000/products';
const productEndpoint = `${baseEndpoint}/${randomID}`;
const stylesEndpoint = `${productEndpoint}/styles`;
const relatedEndpoint = `${productEndpoint}/related`;

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 200ms
    http_reqs.rate: ['rate>1000']
  },
  stages: [
    { duration: '1m', target: 2000 },
    { duration: '5m', target: 1000 },
    { duration: '1m', target: 100 },
  ],

};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function products() {
  http.get(baseEndpoint, {
    tags: { my_custom_tag: 'GET /products' },
  });
  sleep(1);

  http.get(productEndpoint, {
    tags: { my_custom_tag: 'GET /products/:id' },
  });
  sleep(1);

  http.get(stylesEndpoint, {
    tags: { my_custom_tag: 'GET /products/:id/styles' },
  });
  sleep(1);

  http.get(relatedEndpoint, {
    tags: { my_custom_tag: 'GET /products/:id/related' },
  });
}
