mockery.registerMock('../config', {
  orbitRadius: 2000
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

      allocator.next('some/repogfdg').x.should.equal(2000);
      allocator.next('some/repodsfdsf').x.should.equal(4000);
    });

    it('seeds r with name', function () {
      var tan = sinon.stub(Math, 'tan').returns(1.5),
          allocator = new OrbitAllocator();

      allocator.next('some/repo').r.should.equal(1.5);

      tan.should.have.been.calledWith(921);

      tan.restore();
    });
  });

});
