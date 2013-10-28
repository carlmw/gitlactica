var THREE = require('three'),
    zero = new THREE.Vector3(0, 0, 0);

module.exports = Torpedo;

function Torpedo(position) {
  this.alpha = 0;
  this.position = position;
}

Torpedo.prototype.track = function () {
  this.alpha += 0.001;
  this.position.lerp(zero, this.alpha);
  return this;
};

Torpedo.prototype.unDetonated = function () {
  return this.alpha < 1;
};
