var TWEEN = require('tween');

module.exports = followCourse;

function followCourse(ship, course, next) {

  var pivot = ship.pivot,
      distance = lineDistance(course.getPointAt(0), course.getPointAt(1)),
      duration = Math.round(distance * 0.1),
      mesh = ship.mesh,
      tween = new TWEEN.Tween({ control: 0 })
        .to({ control: 1 }, Math.min(duration, 4e3))
        .onStart(function () {
          mesh.rotation.z = 0;
          mesh.position.set(0, 0, 0);
        })
        .onUpdate(function () {
          var tan = course.getTangent(this.control);
          pivot.position = course.getPointAt(this.control);
          pivot.rotation.z = Math.atan2(-tan.x, tan.y);
        })
        .onComplete(next)
        .start();

  return tween;
}

function lineDistance(point1, point2) {
  var xs = point2.x - point1.x;
  var ys = point2.y - point1.y;

  xs = xs * xs;
  ys = ys * ys;

  return Math.sqrt(xs + ys);
}
