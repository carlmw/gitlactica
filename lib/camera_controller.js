var THREE = require('three'),
    revealPlanet = require('./animation/reveal_planet'),
    genericOrbit = require('./animation/generic_orbit');

module.exports = CameraController;

function CameraController(camera, subspace) {
  this.camera = camera;
  subspace.on('show:planet', this.showPlanet.bind(this));
}

CameraController.prototype.showPlanet = function (repo) {
  if (this.tween) {
    this.tween.stop();
  }
  this.tween = revealPlanet(this.camera, repo.planet.pivot.position);
  this.tween.onComplete(function () {
    this.tween = genericOrbit(this.camera, repo.planet.pivot.position, new THREE.Vector3(0, 0, -1), 6);
  }.bind(this));
};
