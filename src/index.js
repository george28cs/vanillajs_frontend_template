const W3CWebSocket = require('websocket').w3cwebsocket;
const client = new W3CWebSocket('ws://localhost:1880/ws/plc', 'echo-protocol');

const gauge_01 = document.getElementById('gauge_01');
console.log(gauge_01)
client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
  const payload = JSON.parse(e.data);
  console.log(payload);
  if (payload.gauge_01){
    gauge_01.innerHTML = `${payload.gauge_01.current_value} PSI`;
  }
};