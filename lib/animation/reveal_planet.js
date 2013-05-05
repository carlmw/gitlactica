var TWEEN = require('tween');

module.exports = revealPlanet;

function revealPlanet(camera, planetPosition) {
  var props = {
        x: camera.position.x,
        y: camera.position.y,
        c: 0,
        z: camera.position.z
      };

  return new TWEEN.Tween(props)
    .to({ x: planetPosition.x, y: planetPosition.y, c: 2 }, 5e3)
    .onUpdate(function () {
      var c = (this.c < 1) ? this.c : (2 - this.c);
      camera.position.set(this.x, this.y, 6000 + (24000 * c));
      camera.lookAt(planetPosition);
    })
    .start();
}
