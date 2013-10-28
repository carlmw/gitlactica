var THREE = require('three');

module.exports = Torpedo;

function Torpedo(position, destination) {
  this.alpha = 0;
  this.destination = destination;
  this.position = position;
}

Torpedo.prototype.track = function () {
  this.alpha += 0.001;
  this.position.lerp(this.destination, this.alpha);
  return this;
};

Torpedo.prototype.detonated = function () {
  return this.alpha >= 1;
};
