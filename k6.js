import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';
import { readFileSync } from 'fs';
import path from 'path';

const protoPath = path.resolve(__dirname, 'hello.proto');

console.log('Current working directory:', __dirname);
console.log('Proto file path:', protoPath);

const client = new grpc.Client();
client.load([protoPath]);

export default () => {
  client.connect('dev-objectdetectionservice.default.svc.cluster.local:9080', {
    // plaintext: false
  });

  const data = { greeting: 'Bert' };
  const response = client.invoke('hello.HelloService/SayHello', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  console.log(JSON.stringify(response.message));

  client.close();
  sleep(1);
};
