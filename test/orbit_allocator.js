mockery.registerMock('../config', {
  orbitRadius: 2000
});

mockery.registerMock('seed-random', function () {
  return function () {
    return 0.5;
  };
});

mockery.registerAllowable('../lib/orbit_allocator');

describe('OrbitAllocator', function () {
  var OrbitAllocator;

  beforeEach(function () {
    mockery.enable();
    OrbitAllocator = require('../lib/orbit_allocator');
  });

  afterEach(function () {
    mockery.disable();
  });

  describe('#next', function () {
    it('increments x', function () {
      var allocator = new OrbitAllocator();

      allocator.next('some/repo').x.should.equal(2000);
      allocator.next('some/repo').x.should.equal(4000);
    });

    it('seeds r with name', function () {
      var allocator = new OrbitAllocator();

      allocator.next('some/repo').r.should.equal(Math.PI);
    });
  });

});
