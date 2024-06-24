import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomInt } from 'k6/lib/variables';

export let options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up to 10 virtual users over 30 seconds
    { duration: '1m', target: 500 },    // Maintain 50 virtual users for 1 minute
    { duration: '30s', target: 0 },    // Ramp down to 0 virtual users over 30 seconds
  ],
};

export default function () {
  let url = 'http://dev-flowcessapi.default.svc.cluster.local:9000'; // Replace with your service URL
  
  // Generate random number of keys and values
  let payload = {};
  let numberOfKeys = randomInt(1, 5); // Generate between 1 to 5 keys
  
  for (let i = 0; i < numberOfKeys; i++) {
    let key = `key${i + 1}`;
    let value;
    
    // Generate random value based on type
    switch (randomInt(0, 2)) {
      case 0:
        value = randomInt(1, 100); // Random integer
        break;
      case 1:
        value = `user${randomInt(1, 100)}`; // Random string
        break;
      case 2:
        value = Math.random() > 0.5; // Random boolean
        break;
      default:
        value = `value${i + 1}`; // Default case
        break;
    }
    
    payload[key] = value;
  }

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  let response = http.post(url, JSON.stringify(payload), params);
  
  // Check response status
  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1);
}
