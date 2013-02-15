var config = require('../config'),
    rand = require('seed-random');

module.exports = OrbitAllocator;

function OrbitAllocator () {
  this.x = 0;
}

OrbitAllocator.prototype.next = function (name) {
  this.x += config.orbitRadius;
  
  return {
    x: this.x,
    r: (Math.PI * 2) * rand(name)()
  };
};
