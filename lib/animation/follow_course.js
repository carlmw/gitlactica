var TWEEN = require('tween'),
    orbit = require('./orbit');

module.exports = function followCourse (ship, course) {
  var pivot = ship.pivot,
      mesh = ship.mesh,
      tween = new TWEEN.Tween({ control: 0 })
        .to({ control: 1 }, 2e3)
        .onStart(function () {
          ship.mesh.rotation.z = 0;
          ship.mesh.position.set(0, 0, 0);
        })
        .onUpdate(function () {
          var tan = course.getTangent(this.control);
          pivot.position = course.getPointAt(this.control);
          pivot.rotation.z = Math.atan2(-tan.x, tan.y);
        })
        .start();

  return tween;
};
