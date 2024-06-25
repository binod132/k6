import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 2000, // Number of virtual users
  duration: "70s", // Duration of the test
};

// List of endpoints to be tested
const endpoints = [
  "https://apigateway.anydone.net/co-automation/knowledge-base",
  "https://apigateway.anydone.net/co-automation/automated-replies",
  "https://apigateway.anydone.net/co-automation/automation-entity",
  "https://apigateway.anydone.net/co-workflow/process-template",
  "https://apigateway.anydone.net/co-workflow/process-template"
];

const access_token = "MDY1M2QwN2FiZTQzNGI1OTkyZWRhZmI2MjE5OTU5MWYuODAyMjc1YWVlODI4NGUxYmE3YTc4ZjNlY2YwZTRjMmI=.4f12ccf5ee55c80127f4958ed2cd19bf021d6a5d686d52fcde8a92e6929cf7a9b6adc357473bf196852d4fa64650b27d65e74aa22de3638a6e3bfa50dbf7f9ed";

export default function () {
  // Make requests to all endpoints concurrently
  const responses = http.batch(endpoints.map(url => ({
    method: 'GET',
    url: url,
    params: {
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Origin": "https://inbox.anydone.net"
      },
      timeout: "60s", // Set a 60 seconds timeout
    }
  })));

  // Check the responses
  responses.forEach((response, index) => {
    check(response, {
      [`is status 200 for ${endpoints[index]}`]: (r) => r.status === 200,
    });

    if (response.status !== 200) {
      console.error(`Request to ${endpoints[index]} failed with status: ${response.status}`);
    }
  });

  sleep(1); // Pause between iterations
}
