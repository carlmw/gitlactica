describe('ShipYard', function () {
  var ShipYard,
      ship = sinon.stub(),
      scene = sinon.stub(),
      subspace = {
        emit: sinon.stub(),
        on: sinon.stub()
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
          yard = new ShipYard(scene, {
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
          planet = sinon.stub(),
          yard = new ShipYard(scene, subspace);
      terrysShip.orbit = sinon.stub();
      ship.withArgs(scene, 'terry').returns(terrysShip);
      yard.commision(['terry']);
      subspace.emit('hail:ship', 'terry', planet);

      terrysShip.orbit.should.have.been.calledWith(planet);
    });
  });
});
