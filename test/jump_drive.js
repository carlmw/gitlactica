var courseStub = sinon.stub().returns({ line: sinon.stub(), angle: Math.PI }),
    followStub = sinon.stub(),
    nextStub = sinon.stub(),
    sceneStub = sinon.stub(),
    orbitStub = sinon.stub(),
    shipStub = sinon.stub(),
    planetStub = sinon.stub(),
    exitStub = sinon.stub();

shipStub.location = sinon.stub();

describe('jumpDrive', function () {
  var jumpTo;

  before(function () {
    mockery.registerMock('./animation/follow_course', followStub);
    mockery.registerMock('./animation/orbit', orbitStub);
    mockery.registerMock('./course', courseStub);

    mockery.registerAllowable('../lib/jump_drive');

    mockery.enable();
    jumpTo = require('../lib/jump_drive');
  });

  afterEach(function () {
    followStub.reset();
    courseStub.reset();
    orbitStub.reset();
  });

  after(function () {
    mockery.deregisterAll();
  });

  it("plots a course", function () {
    jumpTo(shipStub, sceneStub)(planetStub);

    courseStub.should.have.been.calledWith(sceneStub, shipStub.location, planetStub);
  });

  it("follows the course", function () {
    jumpTo(shipStub, sceneStub)(planetStub, nextStub);

    followStub.should.have.been.calledWith(shipStub, courseStub.returnValue.line);
  });

  it("orbits the destination after following the course", function () {
    followStub.callsArg(2);

    jumpTo(shipStub, sceneStub)(planetStub, nextStub);

    orbitStub.should.have.been.calledWith(shipStub, planetStub, Math.PI);
  });

  it("sets the ship's location when it enters orbit", function () {
    followStub.callsArg(2);
    orbitStub.callsArgWith(3, exitStub);

    jumpTo(shipStub, sceneStub)(planetStub, nextStub);

    shipStub.location.should.equal(planetStub);
  });

  it("calls next when it enters orbit", function () {
    followStub.callsArg(2);
    orbitStub.callsArgWith(3, exitStub);

    jumpTo(shipStub, sceneStub)(planetStub, nextStub);

    nextStub.should.have.been.called;
  });

  it("calls the exit orbit callback before leaving orbit", function () {
    var drive = jumpTo(shipStub, sceneStub);

    followStub.callsArg(2);
    orbitStub.callsArgWith(3, exitStub);
    exitStub.callsArg(1);

    drive(planetStub, nextStub);

    exitStub.should.not.have.been.called;

    drive(planetStub, nextStub);

    exitStub.should.have.been.calledWith(Math.PI);

    followStub.should.have.been.calledTwice;
  });
});
