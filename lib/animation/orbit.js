var TWEEN = require('tween'),
    config = require('../../config').orbit,
    ONE_TURN = Math.PI * 2,
    multiplier = config.duration / ONE_TURN;

module.exports = orbit;

function orbit(ship, planet, entryAngle, next) {
  "use strict";

  var mesh = ship.mesh,
      tween = new TWEEN.Tween({ angle: entryAngle }),
      exit = function (exitAngle, next) {
        // Ensure the ship travels in the correct direction
        if (exitAngle < entryAngle) {
          exitAngle = ONE_TURN + exitAngle;
        }

        tween
          .to({ angle: exitAngle }, Math.abs(exitAngle - entryAngle) * multiplier)
          .onComplete(function () {
            tween.stop().onComplete(function () {});
            next();
          })
          .start();
      },
      pivot = ship.pivot;

  tween
    .to({ angle: entryAngle + ONE_TURN }, config.duration)
    .onStart(function () {
      pivot.position = planet.pivot.position.clone();
      mesh.position.y = config.radius;
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
}
