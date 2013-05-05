var TWEEN = require('tween'),
    window = require('../util').global();

module.exports = function bombard(scene, ship, planet, ordnance, next) {
  "use strict";

  var i = 0,
      target = planet.pivot.position.clone(),
      timer = window.setInterval(function () {
        i++;
        if (!ordnance[i]) {
          window.clearInterval(timer);
          return;
        }

        var torpedo = ordnance[i],
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

                if (torpedo === ordnance[ordnance.length - 1]) {
                  next();
                }
              })
              .start();
      }, 250);
};
