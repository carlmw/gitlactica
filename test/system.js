describe('System', function () {
  var System,
      SubspaceChannel = require('../lib/subspace_channel'),
      scene = sinon.stub(),
      orbitAllocator = sinon.stub(),
      planet = sinon.stub();

  before(function () {
    mockery.registerMock('./planet', planet);
    mockery.registerMock('./orbit_allocator', orbitAllocator);
    System = require('../lib/system');
  });

  afterEach(function () {
    planet.reset();
    orbitAllocator.reset();
  });

  after(function () {
    mockery.deregisterMock('./planet');
    mockery.deregisterMock('./orbit_allocator');
  });

  describe('#form', function () {
    it("generates a planet", function () {
      var system = new System(scene, {
        on: function () {}
      });
      system.form({ full_name: 'bob/repo', language: 'JavaScript' });

      planet.should.have.been.calledWith(scene, 'bob/repo', 'JavaScript');
    });
  });

  describe('#layout', function () {
    it("reallocates orbits", function () {
      var repoPlanet = sinon.stub(),
          system = new System(scene, {
            on: function () {}
          });
      planet.returns(repoPlanet);
      system.form({ full_name: 'terry/repo' });
      system.layout();

      orbitAllocator.should.have.been.calledWith([repoPlanet]);
    });
  });

  describe('#reform', function () {
    var repoPlanet, system;
    beforeEach(function () {
      repoPlanet = { scale: sinon.stub() };
      system = new System(scene, { on: function () {} });
    });

    it("scales planet correctly", function () {
      planet.returns(repoPlanet);
      system.form({ full_name: 'some/repo' });
      system.reform('some/repo', 1000);

      repoPlanet.scale.should.have.been.calledWith(1);
    });

    it("applies a minimum scale of 0.2", function () {
      planet.returns(repoPlanet);
      system.form({ full_name: 'some/repo' });
      system.reform('some/repo', 0);

      repoPlanet.scale.should.have.been.calledWith(0.2);
    });
  });

  describe("responding to a ship", function () {
    it("sends a reference to itself", function () {
      var subspace = new SubspaceChannel(),
          hail = sinon.stub(),
          repoPlanet = sinon.stub(),
          system = new System(scene, subspace);
      planet.returns(repoPlanet);
      subspace.on('hail:ship', hail);
      system.form({ full_name: 'bob/repo' });
      subspace.emit('hail:planet', 'bob/repo', 'bob');

      hail.should.have.been.calledWith('bob', repoPlanet);
    });
  });

  describe("cycling through planets with the keyboard", function () {
    var subspace,
        system,
        rimmerWorld = sinon.stub(),
        klendathu = sinon.stub();
    before(function () {
      planet
        .withArgs(scene, 'rimmer/world')
        .returns(rimmerWorld);
      planet
        .withArgs(scene, 'bugs/klendathu')
        .returns(klendathu);
    });

    beforeEach(function () {
      subspace = new SubspaceChannel();
      system = new System(scene, subspace);
    });

    describe("when next or previous is triggered", function () {
      beforeEach(function () {
        system.form({ full_name: 'rimmer/world' });
        system.form({ full_name: 'bugs/klendathu' });
      });

      it("triggers a show event with the correct planet", function () {
        var onSpy = sinon.spy();
        subspace.on('show:planet', onSpy);
        subspace.emit('next:planet');
        subspace.emit('next:planet');
        subspace.emit('previous:planet');

        onSpy.args[0][0].planet.should.equal(rimmerWorld);
        onSpy.args[1][0].planet.should.equal(klendathu);
        onSpy.args[2][0].planet.should.equal(rimmerWorld);
      });
    });

    describe("when there are no planets", function () {
      it("should not trigger the show event", function () {
        var on = sinon.stub();
        subspace.on('show:planet', on);
        subspace.emit('next:planet');
        subspace.emit('previous:planet');

        on.should.not.have.been.called;
      });
    });
  });
});
