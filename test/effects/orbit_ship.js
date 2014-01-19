var orbitShip = require('../../lib/effects/orbit_ship'),
    tween = {
      chain: function () { return tween; },
      start: function () { return tween; },
      repeat: function () { return tween; }
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
    };

global.log = function () {};

describe('orbitShip', function () {
  beforeEach(function () {
    sinon.stub(renderer, 'planetPosition')
      .withArgs('carlmw/gitlactica')
      .returns({ x: 100, y: 200, z: 300 });
    sinon.stub(animation, 'tween').returns(tween);
  });

  it('moves the ship toward the planet', function () {
    animation.tween
      .withArgs({ x: 100, y: 25200, z: 300 }, { x: 100, y: 200, z: 300 }, 6e3)
      .callsArgOn(3, { x: 100, y: 15000, z: 300 })
      .returns(tween);

    var rendererMock = sinon.mock(renderer);
    rendererMock.expects('moveShip').withArgs('carlmw', 100, 15000, 300);

    orbitShip()(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
  });

  it('orbits the planet', function () {
    animation.tween
      .withArgs({ z: 0 }, { z: -Math.PI * 2 }, 64e3)
      .callsArgOn(3, { z: Math.PI })
      .returns(tween);

    var rendererMock = sinon.mock(renderer);
    rendererMock.expects('rotateShip').withArgs('carlmw', 0, 0, Math.PI);

    orbitShip()(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
  });

  describe('when the ship is already orbiting a planet', function () {
    describe('when the current planet is the same as the destination', function () {
      it('just calls next', function () {
        var next = sinon.mock(),
            os = orbitShip();
        os(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
        animation.tween.reset();
        os(animation, renderer, 'carlmw', 'carlmw/gitlactica', next);

        expect(animation.tween).not.to.have.been.called;
        next.verify();
      });
    });
  });
});
