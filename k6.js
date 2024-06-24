import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up to 10 virtual users over 30 seconds
    { duration: '1m', target: 50 },    // Maintain 50 virtual users for 1 minute
    { duration: '30s', target: 0 },    // Ramp down to 0 virtual users over 30 seconds
  ],
};

export default function () {
  let url = 'http://dev-flowcessapi.default.svc.cluster.local:9000'; // Replace with your service URL
  
  // Generate random number of keys and values
  let payload = {};
  let numberOfKeys = Math.floor(Math.random() * 5) + 1; // Generate between 1 to 5 keys
  
  for (let i = 0; i < numberOfKeys; i++) {
    let key = `key${i + 1}`;
    let value;
    
    // Generate random value based on type
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        value = Math.floor(Math.random() * 100) + 1; // Random integer between 1 and 100
        break;
      case 1:
        value = `user${Math.floor(Math.random() * 100) + 1}`; // Random string with 'user' prefix
        break;
      case 2:
        value = Math.random() > 0.5; // Random boolean value
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
  if (response.status !== 200) {
    console.error(`Request failed: ${response.status} ${response.body}`);
  }

  sleep(1);
}
