var orbitShip = require('../../lib/effects/orbit_ship'),
    animation = require('../../adapters/animation'),
    renderer = {
      moveShip: function () {},
      rotateShip: function () {},
      planetPosition: function () {}
    };

describe('orbitShip', function () {
  // var next;
  // beforeEach(function () {
  //   sinon.stub(renderer, 'planetPosition').returns({ x: 0, y: 0, z: 0 });
  //   sinon.stub(renderer, 'moveShip');
  //   sinon.stub(renderer, 'rotateShip');
  //   next = sinon.stub();
  //   orbitShip()(animation, renderer, 'carlmw', 'carlmw/gitlactica', next);
  // });

  // afterEach(playAnimation.cleanUp);

  // it('resets the ships rotation', function () {
  //   expect(renderer.rotateShip).to.have.been.calledWith('carlmw', 0, 0, 0);
  // });

  // it('moves the ship toward the planet', function () {
  //   playAnimation(2e3, 10);

  //   expect(renderer.moveShip.firstCall.args).to.eql(['carlmw', 0, 25000, 0]);
  //   expect(renderer.moveShip.callCount).to.equal(21);
  //   expect(renderer.moveShip.lastCall.args).to.eql(['carlmw', 0, 0, 0]);
  // });

  // describe('when the ship reaches the planet', function () {
  //   it('orbits the planet', function () {
  //     renderer.rotateShip.reset();
  //     playAnimation(64e3 + 2e3, 10);
  //     expect(renderer.rotateShip.callCount).to.equal(641);
  //     expect(renderer.rotateShip.firstCall.args).to.eql(['carlmw', 0, 0, 0]);
  //     expect(renderer.rotateShip.lastCall.args).to.eql(['carlmw', 0, 0, -Math.PI * 2]);
  //   });

  //   it('calls next', function () {
  //     playAnimation(2e3, 10);
  //     sinon.clock.tick(5e3);
  //     expect(next).to.have.been.called;
  //   });
  // });

  // describe('when the ship is already orbiting a planet', function () {
  //   describe('when the current planet is the same as the destination', function () {
  //     it('calls next', function () {
  //       var next = sinon.mock(),
  //           os = orbitShip();
  //       os(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
  //       os(animation, renderer, 'carlmw', 'carlmw/gitlactica', next);

  //       next.verify();
  //     });

  //     it('doesnt animate', function () {
  //       var os = orbitShip();
  //       os(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
  //       playAnimation.cleanUp();
  //       os(animation, renderer, 'carlmw', 'carlmw/gitlactica', function () {});
  //       playAnimation(2e3, 10);

  //       expect(renderer.moveShip).not.to.have.been.called;
  //     });
  //   });

  //   describe('when the current planet is not the same as the destination', function () {
  //     it('leaves orbit');
  //   });
  // });
});
