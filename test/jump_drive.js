var course = sinon.stub().returns({
      line: sinon.stub(),
      angle: Math.PI
    }),
    follow = sinon.stub(),
    next = sinon.stub(),
    scene = sinon.stub(),
    orbit = sinon.stub(),
    ship = sinon.stub(),
    planet = sinon.stub(),
    vector = sinon.stub(),
    three = require('three'),
    exit = sinon.stub();

describe('jumpDrive', function () {
  var jumpTo;

  before(function () {
    mockery.registerMock('./animation/follow_course', follow);
    mockery.registerMock('./animation/orbit', orbit);
    mockery.registerMock('./course', course);
    jumpTo = require('../lib/jump_drive');
  });

  afterEach(function () {
    follow.reset();
    course.reset();
    orbit.reset();
  });

  it("plots a course", function () {
    var vector = { x: 1, y: 2, z: 3 };
    sinon.stub(three, 'Vector3').returns(vector);
    jumpTo(ship, scene)(planet);

    course.should.have.been.calledWith(scene, { pivot: { position: vector } }, planet);
  });

  it("follows the course", function () {
    jumpTo(ship, scene)(planet, next);

    follow.should.have.been.calledWith(ship, course.returnValue.line);
  });

  it("orbits the destination after following the course", function () {
    follow.callsArg(2);
    jumpTo(ship, scene)(planet, next);

    orbit.should.have.been.calledWith(ship, planet, Math.PI);
  });

  it("calls next when it enters orbit", function () {
    follow.callsArg(2);
    orbit.callsArgWith(3, exit);
    jumpTo(ship, scene)(planet, next);

    next.should.have.been.called;
  });

  it("calls the exit orbit callback before leaving orbit", function () {
    var drive = jumpTo(ship, scene);
    follow.callsArg(2);
    orbit.callsArgWith(3, exit);
    exit.callsArg(1);
    drive(planet, next);

    exit.should.not.have.been.called;

    drive(planet, next);

    exit.should.have.been.calledWith(Math.PI);

    follow.should.have.been.calledTwice;
  });

  it("plots the course from the current location", function () {
    var drive = jumpTo(ship, scene);
    drive(planet, next);
    drive(planet, next);

    course.should.have.been.calledTwice;
    course.should.have.been.calledWith(scene, planet, planet);
  });

  describe('#location', function () {
    it("returns the current location of the ship", function () {
      var drive = jumpTo(ship, scene);
      drive(planet, next);

      drive.location().should.equal(planet);
    });
  });
});
