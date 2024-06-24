import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up to 10 virtual users over 30 seconds
    { duration: '1m', target: 50 },    // Maintain 50 virtual users for 1 minute
    { duration: '30s', target: 0 },    // Ramp down to 0 virtual users over 30 seconds
  ],
};

export default function () {
  let url = 'http://dev-objectdetectionservice.default.svc.cluster.local:9080';

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response = http.get(url, params);

  // Check response status
  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  // Optionally log response body
  console.log(`Response body: ${response.body}`);

  sleep(1);
}
