describe('CameraController', function () {
  var revealPlanetInterface = { stop: function () {} },
      revealPlanet = sinon.stub().returns(revealPlanetInterface),
      camera = 'camera',
      SubspaceChannel = require('../lib/subspace_channel'),
      CameraController;

  before(function () {
    mockery.registerMock('./animation/reveal_planet', revealPlanet);
    CameraController = require('../lib/camera_controller');
  });

  after(function () {
    mockery.deregisterMock('./animation/reveal_planet');
  });

  describe("when a show:planet event is received", function () {
    var controller,
        planet = { planet: { pivot: { position: sinon.stub() } } },
        subspace;

    beforeEach(function () {
      subspace = new SubspaceChannel();
      controller = new CameraController(camera, subspace);
    });

    it("starts a planet reveal animation", function () {
      subspace.emit('show:planet', planet);

      revealPlanet.should.have.been.calledWith(camera, planet.planet.pivot.position);
    });

    it("terminates any running animation", function () {
      var revealMock = sinon.mock(revealPlanetInterface);
      revealMock.expects('stop');
      subspace.emit('show:planet', planet);
      subspace.emit('show:planet', planet);

      revealMock.verify();
    });
  });
});
