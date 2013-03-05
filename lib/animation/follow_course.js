var TWEEN = require('tween'),
    orbit = require('./orbit');

module.exports = followCourse;

function followCourse(ship, course, next) {
  var pivot = ship.pivot,
      mesh = ship.mesh,
      tween = new TWEEN.Tween({ control: 0 })
        .to({ control: 1 }, 2e3)
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
