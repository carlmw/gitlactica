var TWEEN = require('tween');

module.exports = function orbit (ship, planet, entryAngle, next) {
  "use strict";

  var mesh = ship.mesh,
      tween,
      exit = function (angle, next) {
        tween
          .to({ angle: angle }, 3e3)
          .onComplete(function () {
            tween.stop();
            next();
          })
          .start();
      },
      pivot = ship.pivot;

    tween = new TWEEN.Tween({ angle: entryAngle })
      .to({ angle: entryAngle + (Math.PI * 2) }, 5e3)
      .onStart(function () {
        pivot.position = planet.mesh.position.clone();
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
        
        if (exit) {
          next(exit);
          exit = null;
        }
      })
      .start();
};
