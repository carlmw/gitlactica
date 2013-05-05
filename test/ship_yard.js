describe('ShipYard', function () {
  var ShipYard,
      ship = sinon.stub(),
      scene = sinon.stub(),
      subspace = {
        emit: sinon.stub(),
        once: sinon.stub()
      },
      SubspaceChannel = require('../lib/subspace_channel'),
      committer = { login: 'intrepid', last_commit: '2012-09-23T17:50:51Z' };

  before(function () {
    mockery.registerMock('./ship', ship);
    mockery.registerAllowable('../lib/ship_yard');
    ShipYard = require('../lib/ship_yard');
  });

  afterEach(function () {
    ship.reset();
  });

  describe('#commision', function () {
    it("builds Ships for commiters", function () {
      var yard = new ShipYard(scene, subspace);
      yard.commision([committer]);

      ship.should.have.been.calledWith(scene, committer);
    });

    it("does not build a ship for an existing commiter", function () {
      var yard = new ShipYard(scene, subspace);
      yard.commision([committer]);
      yard.commision([committer]);

      ship.should.have.been.calledOnce;
    });
  });

  describe('#dispatch', function () {
    it("opens a channel to the planet", function () {
      var emitMock = sinon.mock(),
          yard = new ShipYard(scene, { emit: emitMock, once: function () {} });
      emitMock.withArgs('hail:planet', 'bob/repo', 'bob');
      yard.commision(['bob']);
      yard.dispatch('bob', 'bob/repo');

      emitMock.verify();
    });
  });

  describe("responding to a planet", function () {
    it("sends the ship to the planet", function () {
      var subspace = new SubspaceChannel(),
          terrysShip = {
            orbit: sinon.mock()
          },
          planet = sinon.stub(),
          yard = new ShipYard(scene, subspace);
      ship.withArgs(scene, 'terry').returns(terrysShip);
      sinon.stub(subspace, 'once').withArgs('hail:ship').callsArgWith(1, planet);

      terrysShip.orbit.withArgs(planet);
      yard.commision(['terry']);
      yard.dispatch('terry', 'bob/repo');

      terrysShip.orbit.verify();
    });
  });
});
