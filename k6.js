import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s'
};

export default function () {
  let url = 'http://my-service.default.svc.cluster.local'; // Replace with your service URL
  let response = http.get(url);
  console.log(`Response status code: ${response.status}`);
  sleep(1);
}
