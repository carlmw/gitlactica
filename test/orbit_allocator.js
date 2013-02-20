describe('OrbitAllocator', function () {
  var packStub = sinon.stub(),
      layoutStub = {
        size: sinon.stub(),
        nodes: sinon.stub().returns([])
      },
      randomStub = sinon.stub().returns(0);

  function Planet (x, y) {
    this.mesh = {
      position: {
        x: x,
        y: y,
        z: 0
      }
    };
  }

  var OrbitAllocator;

  before(function () {
    mockery.registerMock('../config', {
      orbitRadius: 2000
    });

    mockery.registerMock('seed-random', function () {
      return randomStub;
    });

    mockery.registerMock('d3', {
      layout: {
        pack: packStub
      }
    });

    mockery.registerAllowable('../lib/orbit_allocator');

    mockery.enable();
    OrbitAllocator = require('../lib/orbit_allocator');
  });

  after(function () {
    mockery.deregisterAll();
  });

  it("creates a circle pack layout with the correct dimensions", function () {
    var sizeMock = sinon.mock();

    packStub.returns({
      size: sizeMock,
      nodes: sinon.stub.returns([])
    });

    sizeMock
      .withArgs([2000 * 2 * 4, 2000 * 2 * 4])
      .returns(layoutStub);

    new OrbitAllocator(['herp', 'derp', 'foo', 'bar']);

    sizeMock.verify();
  });

  describe("#allocate", function () {

    it("adds nodes to the layout", function () {
      var nodesMock = sinon.mock();

      packStub.returns({
        size: sinon.stub().returns({ nodes: nodesMock })
      });

      nodesMock
        .withArgs({ children: [
          { value: 1, label: 'herp', entropy: 0, z: 0 },
          { value: 1, label: 'derp', entropy: 0, z: 0 }
        ]})
        .returns([{}, { x: 100, y: 100, z: 0 }, { x: 100, y: 100, z: 0 }]);

      new OrbitAllocator(['herp', 'derp'])
        .allocate([new Planet(100, 100), new Planet(200, 200)]);

      nodesMock.verify();
    });

    it("subtracts r from each point's x and y", function () {
      var planet = new Planet(1000, 1000),
          nodesStub = sinon.stub().returns([
            {},
            { x: 1000, y: 1000, entropy: 0 }
          ]);

      packStub.returns({
        size: sinon.stub().returns({ nodes: nodesStub })
      });

      var points = new OrbitAllocator(['herp'])
        .allocate([planet]);

      planet.mesh.position.x.should.equal(-1000);
      planet.mesh.position.y.should.equal(-1000);
    });

    it("adds a little entropy to each point's x, y", function () {
      var planet = new Planet(0, 0);

      packStub.returns({
        size: sinon.stub().returns({
          nodes: function (data) {
            data.children.unshift({});
            data.children[1].x = 0;
            data.children[1].y = 0;

            return data.children;
          }
        })
      });

      randomStub.returns(0.7);

      var points = new OrbitAllocator(['derp'])
        .allocate([planet]);

      planet.mesh.position.x.should.equal(-600);
      planet.mesh.position.y.should.equal(-600);
    });

    it("adds a little entropy to each point's z");
  });
});
