(function (global, define) {
  "use strict";

  define(['emitter'], function (emitter) {

    var WebSocket = global.WebSocket || global.MozWebSocket;

    function Client (host) {
      var socket = this.socket = new WebSocket(host);
      emitter(this);

      socket.onmessage = this.message.bind(this);
    }

    Client.prototype.send = function (event, message) {
      this.socket.send(JSON.stringify({
        event: event,
        message: message
      }));

      return this;
    };

    Client.prototype.message = function (message) {
      message = JSON.parse(message);

      this.emit.call(this, message.event, message.message);

      return this;
    };

    return Client;
  });
}(window, define));
