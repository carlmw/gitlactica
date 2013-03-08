describe('animation/orbit', function () {
  var tweenStub = chainableTweenStub(),
      tweenMock = {
        Tween: sinon.stub().returns(tweenStub)
      },
      configStub = {
        orbit: {
          duration: 5e3,
          radius: 2000
        }
      },
      shipStub = sinon.stub(),
      planetStub = sinon.stub(),
      orbit;

  before(function () {
    mockery.registerMock('tween', tweenMock);
    mockery.registerMock('../../config', configStub);
    mockery.registerAllowable('../../lib/animation/orbit');

    mockery.enable();

    orbit = require('../../lib/animation/orbit');
  });

  after(function () {
    mockery.deregisterAll();
  });

  describe("the exit callback", function () {
    var exit,
        tweenMock;

    beforeEach(function () {
      sinon.stub(tweenStub, 'onComplete')
        .callsArgOn(0, {})
        .returns(tweenStub);

      orbit(shipStub, planetStub, Math.PI, function (cb) { exit = cb; });
      tweenStub.onComplete.restore();
      tweenMock = sinon.mock(tweenStub);
    });

    it("changes the animation's target value", function () {
      tweenMock
        .expects('to')
        .withArgs({ angle: Math.PI * 1.5 }, 1250)
        .returns(tweenStub);

      exit(Math.PI * 1.5, function () {});

      tweenMock.verify();
    });

    it("always travels in the correct direction", function () {
      tweenMock
        .expects('to')
        .withArgs({ angle: Math.PI * 0.5 }, 1250)
        .returns(tweenStub);

      exit(-Math.PI * 1.5, function () {});

      tweenMock.verify();
    });

    it("restarts the animation", function () {
      tweenMock
        .expects('start');

      exit(Math.PI, function () {});

      tweenMock.verify();
    });

    describe('when complete', function () {
      var completeStub;

      beforeEach(function () {
        completeStub = sinon.stub(tweenStub, 'onComplete')
          .callsArg(0)
          .returns(tweenStub);
      });

      afterEach(function () {
        completeStub.restore();
      });

      it("calls stop on the tween", function () {
        tweenMock
          .expects('stop');
        exit(Math.PI, function () {});
        tweenMock.verify();
      });

      it("calls next", function () {
        var nextMock = sinon.mock();
        exit(Math.PI, nextMock);
        nextMock.verify();
      });
    });
  });
});

function chainableTweenStub () {
  var api = {},
      methods = ['to', 'onStart', 'onUpdate', 'onComplete', 'start', 'stop'];

  methods.forEach(function (k) {
    this[k] = function () { return api; };
  }, api);

  return api;
}
