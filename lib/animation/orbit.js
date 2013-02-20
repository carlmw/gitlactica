var TWEEN = require('tween');

module.exports = function orbit (ship, planet, entryAngle, next) {
  "use strict";

  var mesh = ship.mesh,
      pivot = ship.pivot,
      tween = new TWEEN.Tween({ angle: entryAngle })
        .to({ angle: entryAngle + (Math.PI * 2) }, 5e3)
        .onStart(function () {
          pivot.position = planet.mesh.position;
          mesh.position.y = 2000;
        })
        .onUpdate(function () {
          tween.angle = this.angle;
          mesh.rotation.z = Math.PI * 0.5;
          pivot.rotation.z = -this.angle;
        })
        .onComplete(function () {
          this.angle = entryAngle;
          tween.start();
          
          next(exit);
        })
        .start();

  function exit (angle, next) {
    tween
      .stop()
      .to({ angle: angle }, 3e3)
      .onComplete(next)
      .start();
  }
};
