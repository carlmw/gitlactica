describe('orbitAllocator', function () {
  var pack = sinon.stub(),
      layout = {
        size: sinon.stub(),
        nodes: sinon.stub().returns([
          {},
          { value: 1, label: 'herp', entropy: 0, z: 0 },
          { value: 1, label: 'derp', entropy: 0, z: 0 }
        ])
      },
      random = sinon.stub().returns(0),
      orbitAllocator;

  function Planet (x, y) {
    this.pivot = { position: { x: x, y: y, z: 0 } };
  }

  before(function () {
    mockery.registerMock('../config', {
      orbit: { radius: 2000 }
    });
    mockery.registerMock('seed-random', function () {
      return random;
    });
    mockery.registerMock('d3', {
      layout: { pack: pack }
    });
    orbitAllocator = require('../lib/orbit_allocator');
  });

  after(function () {
    mockery.deregisterMock('../config');
    mockery.deregisterMock('seed-random');
    mockery.deregisterMock('d3');
  });

  it("creates a circle pack layout with the correct dimensions", function () {
    var sizeMock = sinon.mock();
    pack.returns({
      size: sizeMock,
      nodes: layout.nodes
    });
    sizeMock
      .withArgs([2000 * 2 * 2, 2000 * 2 * 2])
      .returns(layout);
    orbitAllocator(['herp', 'derp'], [new Planet(100, 100), new Planet(200, 200)]);

    sizeMock.verify();
  });

  describe("#allocate", function () {

    it("adds nodes to the layout", function () {
      var nodesMock = sinon.mock();
      pack.returns({
        size: sinon.stub().returns({ nodes: nodesMock })
      });
      nodesMock
        .withArgs({ children: [
          { value: 1, label: 'herp', entropy: 0, z: 0 },
          { value: 1, label: 'derp', entropy: 0, z: 0 }
        ]})
        .returns([{}, { x: 100, y: 100, z: 0 }, { x: 100, y: 100, z: 0 }]);
      orbitAllocator(['herp', 'derp'], [new Planet(100, 100), new Planet(200, 200)]);

      nodesMock.verify();
    });

    it("subtracts r from each point's x and y", function () {
      var planet = new Planet(1000, 1000),
          nodesStub = sinon.stub().returns([
            {},
            { x: 1000, y: 1000, entropy: 0 }
          ]);
      pack.returns({
        size: sinon.stub().returns({ nodes: nodesStub })
      });
      orbitAllocator(['herp'], [planet]);

      planet.pivot.position.x.should.equal(-1000);
      planet.pivot.position.y.should.equal(-1000);
    });

    it("adds a little entropy to each point's x, y", function () {
      var planet = new Planet(0, 0);
      pack.returns({
        size: sinon.stub().returns({
          nodes: function (data) {
            data.children.unshift({});
            data.children[1].x = 0;
            data.children[1].y = 0;

            return data.children;
          }
        })
      });
      random.returns(0.7);
      orbitAllocator(['derp'], [planet]);

      planet.pivot.position.x.should.equal(-600);
      planet.pivot.position.y.should.equal(-600);
    });

    it("adds a little entropy to each point's z");
  });
});
