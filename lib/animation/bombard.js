define(['vendor/TWEEN'], (function (window) {
  "use strict";

  return function (TWEEN) {

    return function (ship, planet, ordance) {
      var i = 0,
          timer = window.setInterval(function () {
            i++;
            if (!ordance[i]) {
              window.clearInterval(timer);
              return;
            }

            var torpedo = ordance[i];
            new TWEEN.Tween(ship.mesh.position.clone())
                  .to({ x: 0, y: 0, z: 0 }, 2000)
                  .onStart(function () {
                    ship.pivot.add(torpedo);
                  })
                  .onUpdate(function () {
                    torpedo.position = this;
                  })
                  .onComplete(function () {
                    ship.pivot.remove(torpedo);
                  })
                  .start();
          }, 250);
    };
  };
}(window)));
