import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '30s'
};

export default function () {
  let url = 'http://dev-objectdetectionservicei.default.svc.cluster.local:9080';
  let response = http.get(url);
  console.log(`Response status code: ${response.status}`);
  sleep(1);
}
