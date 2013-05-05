var THREE = require('three'),
    TWEEN = require('tween');

module.exports = revealPlanet;

var duration = 2e3;
var panTime = 500;
var orbitVector = new THREE.Vector3(0, -4000, 1000);

function revealPlanet(camera, planetPosition) {
  var props = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
        panWeight: 0
      };
  var initialDirection = camera.quaternion.clone();
  var orbitPosition = new THREE.Vector3();
  orbitPosition.addVectors(planetPosition, orbitVector);

  // Pan the camera smoothly by slerping from
  // the initialDirection to the lookAt direction.
  new TWEEN.Tween(props)
    .to({ panWeight: 1 }, panTime)
    .easing(TWEEN.Easing.Circular.InOut)
    .start();

  return new TWEEN.Tween(props)
    .to({ x: orbitPosition.x, y: orbitPosition.y, z: orbitPosition.z }, duration)
    .onUpdate(function () {
      camera.position.set(this.x, this.y, this.z);
      if (this.panWeight < 1) {
        camera.lookAt(planetPosition);
        camera.quaternion.slerp(initialDirection, 1 - this.panWeight);
      } else {
          camera.lookAt(planetPosition);
      }
    })
    .start();
}
