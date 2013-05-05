var TWEEN = require('tween'),
    window = require('../util').global();

module.exports = tractor;

function tractor(ship, planet, ordnance, next) {
  "use strict";

  var i = 0,
      from = ship.mesh.position,
      timer = window.setInterval(function () {
        i++;
        if (!ordnance[i]) {
          window.clearInterval(timer);
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

                if (torpedo === ordnance[ordnance.length - 1]) {
                  next();
                }
              })
              .start();
      }, 250);
}
