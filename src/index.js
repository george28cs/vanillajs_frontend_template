const W3CWebSocket = require('websocket').w3cwebsocket;
const client = new W3CWebSocket('ws://localhost:1880/ws/plc', 'echo-protocol');
require('zingchart');
require('./index.css');

const gauge_01 = document.getElementById('gauge_01');
client.onerror = function () {
  console.log('Connection Error');
};

client.onopen = function () {
  console.log('WebSocket Client Connected');
};

client.onclose = function () {
  console.log('echo-protocol Client Closed');
};

const gauge_01_config = (value, min, max) => {
  return {
    type: 'gauge',
    series: [
      {
        values: [value],
      },
    ],
    scaleR: {
      minValue: min,
      maxValue: max,
    },
  };
};

zingchart.render({
  id: 'gauge_01',
  data: gauge_01_config(0, 0, 100),
  height: '400px',
  width: '400px',
});

client.onmessage = function (e) {
  const payload = JSON.parse(e.data);
  if (payload.gauge_01) {
    zingchart.render({
      id: 'gauge_01',
      data: gauge_01_config(payload.gauge_01, 0, 100),
      height: '400px',
      width: '400px',
    });
  }
};
