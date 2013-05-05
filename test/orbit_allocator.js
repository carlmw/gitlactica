describe('orbitAllocator', function () {
  var random = sinon.stub().returns(0.2),
      orbitAllocator;

  function planet () {
    return { pivot: { position: { x: 0, y: 0, z: 0 } } };
  }

  before(function () {
    mockery.registerMock('../config', { orbit: { radius: 1000 } });
    mockery.registerMock('seed-random', function () { return random; });
    orbitAllocator = require('../lib/orbit_allocator');
  });

  after(function () {
    mockery.deregisterMock('../config');
    mockery.deregisterMock('seed-random');
  });

  it("positions each planet", function () {
    var jupiter = planet(),
        saturn = planet();
    orbitAllocator([jupiter, saturn]);

    jupiter.pivot.position.y.should.be.within(4755, 4756);
    jupiter.pivot.position.x.should.be.within(1545, 1546);

    saturn.pivot.position.y.should.be.within(8559, 8560);
    saturn.pivot.position.x.should.be.within(2781, 2782);
  });
});
