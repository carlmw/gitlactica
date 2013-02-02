define(['vendor/TWEEN'], function (TWEEN) {
  "use strict";

  return function (ship, planet) {
    ship.pivot.position = planet.mesh.position.clone();

    var mesh = ship.mesh,
        tween = new TWEEN.Tween({ angle: 0 })
          .to({ angle: Math.PI * 2 }, 20e3)
          .onUpdate(function () {
            mesh.position.set(
              2000 * Math.cos(this.angle),
              2000 * Math.sin(this.angle),
              0
            );
            mesh.rotation.z = this.angle;
          })
          .onComplete(function () {
            this.angle = 0;
            tween.start();
          });

    tween.start();

    return tween;
  };
});
