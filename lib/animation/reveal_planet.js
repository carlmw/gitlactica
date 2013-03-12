var TWEEN = require('tween');

module.exports = revealPlanet;

function revealPlanet(camera, planetPosition) {
  return new TWEEN.Tween(camera.position, 1e3)
    .to({ x: planetPosition.x, y: planetPosition.y })
    .start();
}
