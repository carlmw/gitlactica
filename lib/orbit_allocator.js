var config = require('../config'),
    rand = require('seed-random');

module.exports = orbitAllocator;

function orbitAllocator(planets) {
  planets.forEach(offsetMapper);
}

function offsetMapper(planet, i) {
  var c = (config.orbit.radius * 5) + (config.orbit.radius * (i * 4)),
      a = (Math.PI * 2) * rand()(i);

  planet.pivot.position.y = Math.sin(a) * c;
  planet.pivot.position.x = Math.cos(a) * c;
}
