import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s'
};

export default function () {
  let url = 'http://dev-createfile.svc.cluster.local:9080'; // Replace with your service URL
  let response = http.get(url);
  console.log(`Response status code: ${response.status}`);
  sleep(1);
}
