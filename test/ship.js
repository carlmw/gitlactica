var threeStub = {
      ShaderMaterial: function () {},
      CubeGeometry: function () {},
      Mesh: function () {},
      Object3D: function () {
        this.add = function () {};
      },
      Vector3: function () {}
    },
    weaponStub = function () {
      this.fire = function () {};
      this.tractor = function () {};
    },
    jumpDriveInstanceStub = sinon.stub(),
    jumpDriveStub = sinon.stub().returns(jumpDriveInstanceStub),
    queueStub = sinon.stub(),
    sceneStub = sinon.stub({ add: function () {} });

mockery.registerMock('three', threeStub);
mockery.registerMock('queue-async', queueStub);
mockery.registerMock('./weapon', weaponStub);
mockery.registerMock('./jump_drive', jumpDriveStub);
mockery.registerMock('./shaders', { ship: {} });

mockery.registerAllowable('../lib/ship');

describe("Ship", function () {
  var Ship;

  beforeEach(function () {
    mockery.enable();
    Ship = require('../lib/ship');
  });

  afterEach(function () {
    mockery.disable();
  });

  describe("constructor", function () {
    it("creates a queue to run tasks in series", function () {
      new Ship(sceneStub);

      queueStub.should.have.been.calledWith(1);
      queueStub.reset();
    });
  });

  describe('#orbit', function () {
    it("adds a jump animation to the queue", function () {
      var planetStub = sinon.stub(),
          deferStub = sinon.stub();

        queueStub.returns({
          defer: deferStub
        });

      var ship = new Ship(sceneStub);

      ship.orbit(planetStub);

      deferStub.should.have.been.calledWith(jumpDriveInstanceStub, planetStub);
    });
  });
});
