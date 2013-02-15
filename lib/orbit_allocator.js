var config = require('../config');

module.exports = OrbitAllocator;

function OrbitAllocator () {
  this.x = 0;
}

OrbitAllocator.prototype.next = function (name) {
  this.x += config.orbitRadius;

  var seed = name.split('').reduce(generateSeed, 0);

  return {
    x: this.x,
    r: Math.tan(seed)
  };
};

function generateSeed (memo, c) {
  return memo + c.charCodeAt(0);
}
