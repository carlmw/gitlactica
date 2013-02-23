describe('System', function () {
  var System,
      SubspaceChannel = require('../lib/subspace_channel'),
      sceneStub = sinon.stub(),
      orbitAllocatorStub = sinon.stub(),
      planetStub = sinon.stub();

  before(function () {
    mockery.registerAllowable('../lib/system');
    mockery.registerMock('./planet', planetStub);
    mockery.registerMock('./orbit_allocator', orbitAllocatorStub);
    mockery.enable();

    System = require('../lib/system');
  });

  after(function () {
    mockery.deregisterAll();
  });

  describe('#form', function () {
    it("generates a planet", function () {
      var system = new System(sceneStub, {
        on: function () {}
      });

      system.form({ full_name: 'bob/repo', language: 'JavaScript' });

      planetStub.should.have.been.calledWith(sceneStub, 'bob/repo', 'JavaScript');
    });
  });

  describe('#layout', function () {
    it("reallocates orbits", function () {
      var repoPlanetStub = sinon.stub(),
          system = new System(sceneStub, {
            on: function () {}
          });

      planetStub.returns(repoPlanetStub);
      system.form({ full_name: 'terry/repo' });
      system.layout();

      orbitAllocatorStub.should.have.been.calledWith(['terry/repo'], [repoPlanetStub]);
    });
  });

  describe("responding to a ship", function () {
    it("sends a reference to itself", function () {
      var subspace = new SubspaceChannel(),
          hailStub = sinon.stub(),
          repoPlanetStub = sinon.stub(),
          system = new System(sceneStub, subspace);

      planetStub.returns(repoPlanetStub);

      subspace.on('hail:ship', hailStub);
      system.form({ full_name: 'bob/repo' });
      subspace.emit('hail:planet', 'bob/repo', 'bob');

      hailStub.should.have.been.calledWith('bob', repoPlanetStub);
    });
  });
});
