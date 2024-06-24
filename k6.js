import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s'
};

export default function () {
  let url = 'http://dev-flowcessapi.default.svc.cluster.local:9000'; // Replace with your service URL
  let response = http.get(url);
  console.log(`Response status code: ${response.status}`);
  sleep(1);
}
