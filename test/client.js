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
        data: 'pong'
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

  describe('socket handlers', function () {
    var spy,
        socketStub,
        client;

    beforeEach(function () {
      spy = sinon.spy();
      socketStub = sinon.stub();

      WebSocketStub.returns(socketStub);

      client = new Client();
    });

    describe("when connection is established", function () {
      it("emits an 'open' event", function () {
        client.on('open', spy);

        socketStub.onopen();

        spy.should.have.been.calledOnce;
      });
    });

    describe("receiving a message", function () {
      it("emits the event's message", function () {
        client.on('ping', spy);

        socketStub.onmessage({
          data: JSON.stringify({
            event: 'ping',
            data: 'pong'
          })
        });

        spy.should.have.been.calledWith('pong');
      });
    });
  });
});
