var revealPlanet = require('./animation/reveal_planet');

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
};
