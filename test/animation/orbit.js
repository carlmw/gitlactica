describe('animation/orbit', function () {
  var tween = require('tween'),
      config = {
        orbit: { duration: 5e3, radius: 2000 }
      },
      ship = 'ship',
      planet = 'planet',
      orbit;

  before(function () {
    mockery.registerMock('../../config', config);
    orbit = require('../../lib/animation/orbit');
  });

  after(function () {
    mockery.deregisterMock('../../config');
  });

  describe("the exit callback", function () {
    var exit,
        tweenMock;

    beforeEach(function () {
      sinon.stub(tween.methods, 'onComplete')
        .callsArgOn(0, {})
        .returns(tween.methods);
      orbit(ship, planet, Math.PI, function (cb) { exit = cb; });
      tweenMock = sinon.mock(tween.methods);
    });

    it("changes the animation's target value", function () {
      tweenMock.expects('to')
        .withArgs({ angle: Math.PI * 1.5 }, 1250)
        .returns(tween.methods);
      exit(Math.PI * 1.5, function () {});

      tweenMock.verify();
    });

    it("always travels in the correct direction", function () {
      tweenMock.expects('to')
        .withArgs({ angle: Math.PI * 0.5 }, 1250)
        .returns(tween.methods);
      exit(-Math.PI * 1.5, function () {});

      tweenMock.verify();
    });

    it("restarts the animation", function () {
      tweenMock.expects('start');
      exit(Math.PI, function () {});

      tweenMock.verify();
    });

    describe('when complete', function () {
      it("calls stop on the tween", function () {
        tweenMock.expects('stop');
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
