var TWEEN = require('tween');

module.exports = function orbit (ship, planet, entryAngle) {
  "use strict";

  var mesh = ship.mesh,
      tween = new TWEEN.Tween({ angle: entryAngle })
        .to({ angle: entryAngle + (Math.PI * 2) }, 5e3)
        .onStart(function () {
          ship.pivot.position = planet.mesh.position;
          ship.mesh.position.y = 2000;
        })
        .onUpdate(function () {
          tween.angle = this.angle;
          ship.mesh.rotation.z = Math.PI * 0.5;
          ship.pivot.rotation.z = -this.angle;
        })
        .onComplete(function () {
          this.angle = entryAngle;
          tween.start();
        })
        .start();

  return tween;
};
