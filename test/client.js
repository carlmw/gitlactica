describe("Client", function () {
  var Client,
      WebSocket = sinon.stub(),
      global = {
        WebSocket: WebSocket
      },
      util = {
        global: function () {
          return global;
        }
      };

  before(function () {
    mockery.registerMock('./util', util);
    Client = require('../lib/client');
  });

  after(function () {
    mockery.deregisterMock('./util');
  });

  afterEach(function () {
    WebSocket.reset();
  });

  it("creates a socket", function () {
    new Client('host:port');
    WebSocket.should.have.been.calledWith('host:port');
  });

  describe("#send", function () {
    it("sends a message to the socket", function () {
      var sendMock = sinon.mock(),
          client;
      sendMock.withArgs(JSON.stringify({
        event: 'ping',
        data: 'pong'
      }));
      WebSocket.returns({
        send: sendMock
      });
      new Client()
        .send('ping', 'pong');

      sendMock.verify();
    });

    it("returns the instance", function () {
      WebSocket.returns({ send: function () {} });
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
      WebSocket.returns(socketStub);
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
