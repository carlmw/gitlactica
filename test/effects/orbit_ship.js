var tween = {
      chain: function () { return tween; },
      start: function () { return tween; },
      repeat: function () { return tween; },
      stop: function () { return tween; }
    },
    animation = {
      tween: function () {
        return tween;
      },
      wait: function () {}
    },
    renderer = {
      moveShip: function () {},
      rotateShip: function () {},
      planetPosition: function () {}
    },
    mockery = require('mockery');

// global.log = function () {};

describe('orbitShip', function () {
  var raf,
      orbitShip;
  beforeEach(function () {
    raf = sinon.stub();
    mockery.enable({ warnOnUnregistered: false });
    mockery.registerMock('raf-component', raf);
    sinon.stub(renderer, 'planetPosition')
      .returns({ x: 0, y: 0, z: 0 });
    orbitShip = require('../../lib/effects/orbit_ship');
    // sinon.stub(animation, 'tween').returns(tween);
  });

  afterEach(function () {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('moves the ship toward the planet', function () {
    var rendererMock = sinon.mock(renderer);
    rendererMock.expects('moveShip').withArgs('carlmw', 0, (25000 / 120), 0);

    orbitShip()(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});

    rendererMock.verify();
  });

  it('orbits the planet', function () {
    orbitShip()(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
    if (raf.called) _.times(120, raf.firstCall.args[0]);

    var rendererMock = sinon.mock(renderer);
    rendererMock.expects('rotateShip').withArgs('carlmw', 0, 0, Math.PI);

    raf.firstCall.args[0]();

    rendererMock.verify();
    // When planetPos.y += 25000
    // stop moving the ship and start rotateShip

    // animation.tween
    //   .withArgs({ z: 0 }, { z: -Math.PI * 2 }, 64e3)
    //   .callsArgOn(3, { z: Math.PI })
    //   .returns(tween);

    // var rendererMock = sinon.mock(renderer);
    // rendererMock.expects('rotateShip').withArgs('carlmw', 0, 0, Math.PI);

    // orbitShip()(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
  });

  describe('when the ship is already orbiting a planet', function () {
    describe('when the current planet is the same as the destination', function () {
      it('just calls next', function () {
        // var next = sinon.mock(),
        //     os = orbitShip();
        // os(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
        // animation.tween.reset();
        // os(animation, renderer, 'carlmw', 'carlmw/gitlactica', next);

        // expect(animation.tween).not.to.have.been.called;
        // next.verify();
      });
    });

    describe('when the current planet is not the same as the destination', function () {
      it('leaves orbit', function () {
        // var tweenMock = sinon.mock(tween),
        //     os = orbitShip();
        // tweenMock.expects('stop');

        // os(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
        // os(animation, renderer, 'carlmw', 'carlmw/SolariBoard', function () {});

        // tweenMock.verify();
      });
    });
  });
});
