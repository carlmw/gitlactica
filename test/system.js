describe('System', function () {
  var System,
      SubspaceChannel = require('../lib/subspace_channel'),
      sceneStub = sinon.stub(),
      orbitAllocatorStub = sinon.stub(),
      planetStub = sinon.stub();

  before(function () {
    mockery.registerMock('./planet', planetStub);
    mockery.registerMock('./orbit_allocator', orbitAllocatorStub);
    System = require('../lib/system');
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

  describe('#reform', function () {
    it("scales planet correctly", function () {
      var repoPlanetStub = {
            scale: sinon.stub()
          },
          system = new System(sceneStub, {
            on: function () {}
          });
      planetStub.returns(repoPlanetStub);
      system.form({ full_name: 'some/repo' });
      system.reform('some/repo', 1000);

      repoPlanetStub.scale.should.have.been.calledWith(1);
    });

    it("applies a minimum scale of 0.2", function () {
      var repoPlanetStub = {
            scale: sinon.stub()
          },
          system = new System(sceneStub, {
            on: function () {}
          });
      planetStub.returns(repoPlanetStub);
      system.form({ full_name: 'some/repo' });
      system.reform('some/repo', 0);

      repoPlanetStub.scale.should.have.been.calledWith(0.2);
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

  describe("cycling through planets with the keyboard", function () {
    var subspace,
        system,
        rimmerWorld = sinon.stub(),
        klendathu = sinon.stub();
    before(function () {
      planetStub
        .withArgs(sceneStub, 'rimmer/world')
        .returns(rimmerWorld);
      planetStub
        .withArgs(sceneStub, 'bugs/klendathu')
        .returns(klendathu);
    });

    beforeEach(function () {
      subspace = new SubspaceChannel();
      system = new System(sceneStub, subspace);
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
        var onStub = sinon.stub();
        subspace.on('show:planet', onStub);
        subspace.emit('next:planet');
        subspace.emit('previous:planet');

        onStub.should.not.have.been.called;
      });
    });
  });
});
