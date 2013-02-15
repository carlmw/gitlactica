var WebSocketStub = sinon.stub(),
    globalStub = {
      WebSocket: WebSocketStub
    };
    utilStub = {
      global: function () {
        return globalStub;
      }
    };

mockery.registerMock('./util', utilStub);
mockery.registerAllowables(['../lib/client', 'emitter']);

describe("Client", function () {
  var Client;

  beforeEach(function () {
    mockery.enable();
    Client = require('../lib/client');
  });

  afterEach(function () {
    mockery.disable();
    WebSocketStub.reset();
  });

  it("creates a socket", function () {
    new Client('host:port');

    WebSocketStub.should.have.been.calledWith('host:port');
  });

  describe("#send", function () {
    it("sends a message to the socket", function () {
      var sendMock = sinon.mock(),
          client;
      
      sendMock.withArgs(JSON.stringify({
        event: 'ping',
        message: 'pong'
      }));

      WebSocketStub.returns({
        send: sendMock
      });

      new Client()
        .send('ping', 'pong');

      sendMock.verify();
    });

    it("returns the instance", function () {
      WebSocketStub.returns({ send: function () {} });

      var client = new Client();

      client.send().should.equal(client);
    });
  });

  describe("receiving a message", function () {
    it("emits the event's message", function () {
      WebSocketStub.returns(socketStub);

      var spy = sinon.spy(),
          socketStub = sinon.stub(),
          client;

      WebSocketStub.returns(socketStub);

      client = new Client();
      client.on('ping', spy);

      socketStub.onmessage(JSON.stringify({
        event: 'ping',
        message: 'pong'
      }));

      spy.should.have.been.calledWith('pong');
    });
  });
});
