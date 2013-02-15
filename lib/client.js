var emitter = require('emitter'),
    global = require('./util').global(),
    WebSocket = global.WebSocket;

module.exports = Client;

function Client (host) {
  var socket = this.socket = new WebSocket(host);
  emitter(this);

  socket.onmessage = messageHandler.bind(this);
}

Client.prototype.send = function (event, message) {
  this.socket.send(JSON.stringify({
    event: event,
    message: message
  }));

  return this;
};

function messageHandler (message) {
  message = JSON.parse(message);

  this.emit.call(this, message.event, message.message);
}
