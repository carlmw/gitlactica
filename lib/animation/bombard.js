define(['vendor/TWEEN'], (function (window) {
  "use strict";

  return function (TWEEN) {

    return function (scene, ship, planet, ordance) {
      var i = 0,
          from = ship.mesh.matrixWorld.getPosition(),
          target = planet.mesh.position.clone(),
          timer = window.setInterval(function () {
            i++;
            if (!ordance[i]) {
              window.clearInterval(timer);
              return;
            }

            var torpedo = ordance[i],
                from = ship.mesh.matrixWorld.getPosition();
            new TWEEN.Tween({ x: from.x, y: from.y, z: from.z })
                  .to(target, 2e3)
                  .onStart(function () {
                    scene.add(torpedo);
                  })
                  .onUpdate(function () {
                    torpedo.position = this;
                  })
                  .onComplete(function () {
                    scene.remove(torpedo);
                  })
                  .start();
          }, 250);
    };
  };
}(window)));
