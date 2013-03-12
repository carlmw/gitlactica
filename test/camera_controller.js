describe('CameraController', function () {
  var revealPlanet = sinon.stub(),
      cameraStub = sinon.stub(),
      SubspaceChannel = require('../lib/subspace_channel'),
      CameraController;

  before(function () {
    mockery.registerMock('./animation/reveal_planet', revealPlanet);
    mockery.registerAllowable('../lib/camera_controller');
    mockery.enable();

    CameraController = require('../lib/camera_controller');
  });

  beforeEach(function () {
    revealPlanet.reset();
  });

  after(function () {
    mockery.deregisterAll();
  });

  describe("when a show:planet event is received", function () {
    var controller,
        planetStub = { pivot: { position: sinon.stub() } },
        subspace;

    beforeEach(function () {
      subspace = new SubspaceChannel();
      controller = new CameraController(cameraStub, subspace);
    });

    it("starts a planet reveal animation", function () {
      subspace.emit('show:planet', planetStub);
      
      revealPlanet.should.have.been.calledWith(cameraStub, planetStub.pivot.position);
    });

    it("terminates any running animation", function () {
      var stopMock = sinon.mock();

      revealPlanet.returns({
        stop: stopMock
      });

      subspace.emit('show:planet', planetStub);
      subspace.emit('show:planet', planetStub);

      stopMock.verify();
    });
  });
});
