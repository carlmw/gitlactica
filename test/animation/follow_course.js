describe('animation/followCourse', function () {
  var ship = sinon.stub(),
      course = { getPointAt: sinon.stub().returns({ x: 0, y: 0 }) },
      tween = require('tween'),
      followCourse = require('../../lib/animation/follow_course');

  course.getPointAt.withArgs(0).returns({ x: 100, y: 3000 });
  course.getPointAt.withArgs(1).returns({ x: 3000, y: 100 });

  it("the duration is a function of the course distance", function () {
    var tweenMock = sinon.mock(tween.methods);
    tweenMock
      .expects('to').withArgs({ control: 1 }, 410)
      .returns(tween.methods);
    followCourse(ship, course, function () {});

    tweenMock.verify();
  });
});
