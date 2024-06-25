import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['.'], 'hello.proto');  // Ensure this path is correct
console.log(`Current working directory: ${__ENV.PWD}`);

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
