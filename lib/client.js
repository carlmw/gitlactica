var emitter = require('emitter-component'),
    window = require('./util').global(),
    WebSocket = window.WebSocket || window.MozWebSocket;

module.exports = Client;

function Client(host) {
  var socket = this.socket = new WebSocket(host);
  emitter(this);

  socket.onmessage = messageHandler.bind(this);
  socket.onopen = openHandler.bind(this);
}

Client.prototype.send = function (event, message) {
  this.socket.send(JSON.stringify({
    event: event,
    data: message
  }));

  return this;
};

function messageHandler(message) {
  message = JSON.parse(message.data);

  this.emit.call(this, message.event, message.data);
}

function openHandler() {
  this.emit.call(this, 'open');
}
