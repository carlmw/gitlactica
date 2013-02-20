describe('ShipYard', function () {
  var ShipYard,
      shipStub = sinon.stub(),
      sceneStub = sinon.stub(),
      subspaceStub = {
        emit: sinon.stub(),
        on: sinon.stub()
      },
      SubspaceChannel = require('../lib/subspace_channel'),
      committer = { login: 'intrepid', last_commit: '2012-09-23T17:50:51Z' };

  before(function () {
    mockery.registerMock('./ship', shipStub);
    mockery.registerAllowable('../lib/ship_yard');

    ShipYard = require('../lib/ship_yard');
  });

  after(function () {
    mockery.deregisterAll();
  });

  afterEach(function () {
    shipStub.reset();
  });

  describe('#commision', function () {
    it("builds Ships for commiters", function () {
      var yard = new ShipYard(sceneStub, subspaceStub);
      yard.commision([committer]);

      shipStub.should.have.been.calledWith(sceneStub, committer);
    });

    it("does not build a ship for an existing commiter", function () {
      var yard = new ShipYard(sceneStub, subspaceStub);

      yard.commision([committer]);
      yard.commision([committer]);

      shipStub.should.have.been.calledOnce;
    });
  });

  describe('#dispatch', function () {
    it("opens a channel to the planet", function () {
      var emitMock = sinon.mock(),
          yard = new ShipYard(sceneStub, {
            emit: emitMock,
            on: function () {}
          });

      emitMock.withArgs('hail:planet', 'bob/repo', 'bob');

      yard.commision(['bob']);
      yard.dispatch('bob', 'bob/repo');

      emitMock.verify();
    });
  });

  describe("responding to a planet", function () {
    it("sends the ship to the planet", function () {
      var subspace = new SubspaceChannel(),
          terrysShip = sinon.stub(),
          planetStub = sinon.stub(),
          yard = new ShipYard(sceneStub, subspace);

      terrysShip.orbit = sinon.stub();
      shipStub.withArgs(sceneStub, 'terry').returns(terrysShip);

      yard.commision(['terry']);
      subspace.emit('hail:ship', 'terry', planetStub);

      terrysShip.orbit.should.have.been.calledWith(planetStub);
    });
  });
});
