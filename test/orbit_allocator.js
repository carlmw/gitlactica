var packStub = sinon.stub();

mockery.registerMock('../config', {
  orbitRadius: 2000
});

mockery.registerMock('seed-random', function () {
  return function () {
    return 0.5;
  };
});

mockery.registerMock('d3', {
  layout: {
    pack: packStub
  }
});

mockery.registerAllowable('../lib/orbit_allocator');

describe('OrbitAllocator', function () {
  function Planet (x, y) {
    this.mesh = {
      position: {
        x: x,
        y: y
      }
    };
  }

  var OrbitAllocator;

  beforeEach(function () {
    var layoutStub = {
      size: sinon.stub(),
      nodes: sinon.stub().returns([])
    };
    layoutStub.size.returns(layoutStub);

    packStub.returns(layoutStub);

    mockery.enable();
    OrbitAllocator = require('../lib/orbit_allocator');
  });

  afterEach(function () {
    mockery.disable();
  });

  it("creates a circle pack layout with the correct dimensions", function () {
    var sizeMock = packStub.returnValue.size = sinon.mock();

    sizeMock
      .withArgs([(2000 * 4) * 2, (2000 * 4) * 2]);

    new OrbitAllocator(['herp', 'derp', 'foo', 'bar']);

    sizeMock.verify();
  });

  describe("#allocate", function () {

    it("adds nodes to the layout", function () {
      var nodesMock = packStub.returnValue.nodes = sinon.mock();

      nodesMock
        .withArgs({ children: [
          { value: 1, label: 'herp', comparitor: 0.5 },
          { value: 1, label: 'derp', comparitor: 0.5 }
        ]})
        .returns([{}, { x: 100, y: 100 }, { x: 100, y: 100 }]);

      new OrbitAllocator(['herp', 'derp'])
        .allocate([new Planet(100, 100), new Planet(200, 200)]);

      nodesMock.verify();
    });

    it("subtracts r from each point's x and y", function () {
      var planet = new Planet(1000, 1000);

      packStub.returnValue.nodes.returns([
        {},
        { x: 1000, y: 1000 }
      ]);

      var points = new OrbitAllocator(['herp'])
        .allocate([planet]);

      planet.mesh.position.x.should.equal(-1000);
      planet.mesh.position.y.should.equal(-1000);
    });
  });
});
