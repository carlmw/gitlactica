var TWEEN = require('tween'),
    global = window;

module.exports = function tractor (ship, planet, ordnance, beam) {
  "use strict";

  var i = 0,
      from = ship.mesh.position,
      timer = global.setInterval(function () {
        i++;
        if (!ordnance[i]) {
          global.clearInterval(timer);
          return;
        }

  var torpedo = ordnance[i];

  new TWEEN.Tween({ x: 0, y: 0, z: 0 })
        .to({ x: from.x, y: from.y, z: from.z }, 2e3)
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
