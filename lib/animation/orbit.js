define(['vendor/TWEEN'], function (TWEEN) {
  "use strict";

  return function (ship, planet) {
    ship.pivot.position = planet.mesh.position.clone();
    ship.mesh.position.y = 2000;
    ship.mesh.rotation.z = Math.PI * 0.5;
    var mesh = ship.mesh,
        tween = new TWEEN.Tween({ angle: 0 })
          .to({ angle: Math.PI * 2 }, 5e3)
          .onUpdate(function () {
            ship.pivot.rotation.z = -this.angle;
          })
          .onComplete(function () {
            this.angle = 0;
            tween.start();
          });

    tween.start();

    return tween;
  };
});
