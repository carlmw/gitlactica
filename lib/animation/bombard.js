var TWEEN = require('tween'),
    global = require('../util').global();

module.exports = function bombard (scene, ship, planet, ordnance) {
  "use strict";

  var i = 0,
      target = planet.mesh.position.clone(),
      timer = global.setInterval(function () {
        i++;
        if (!ordnance[i]) {
          global.clearInterval(timer);
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
              })
              .start();
      }, 250);
};
