describe('animation/follow_course', function () {
  var follow_course,
      ship = sinon.stub(),
      course = {
        getPointAt: sinon.stub().returns({ x: 0, y: 0 })
      },
      tween = require('../../helpers/tween_stub')();

  course.getPointAt.withArgs(0).returns({ x: 100, y: 3000 });
  course.getPointAt.withArgs(1).returns({ x: 3000, y: 100 });

  before(function () {
    mockery.registerMock('tween', tween);
    mockery.registerAllowable('../../lib/animation/follow_course');

    mockery.enable();
  
    follow_course = require('../../lib/animation/follow_course');
  });

  after(function () {
    mockery.deregisterAll();
  });

  it("the duration is a function of the course distance", function () {
    var tweenMock = sinon.mock(tween.methods);

    tweenMock
      .expects('to').withArgs({ control: 1 }, 410)
      .returns(tween.methods);

    follow_course(ship, course, function () {});

    tweenMock.verify();
  });
});
