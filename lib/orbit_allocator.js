var config = require('../config'),
    rand = require('seed-random'),
    d3 = require('d3');

module.exports = orbitAllocator;

function orbitAllocator(repos, planets) {
  var r = repos.length * config.orbit.radius,
      layout = d3.layout.pack()
        .size([r * 2, r * 2]),
      children = repos.map(nodeMapper),
      nodes = layout.nodes({ children: children }).slice(1);

  planets.map(offsetMapper);

  function offsetMapper(planet, i) {
    var node = nodes[i],
        entropy = Math.round(r * (-0.5 + node.entropy));

    planet.pivot.position.x = node.x - (r * 0.5) + entropy;
    planet.pivot.position.y = node.y - (r * 0.5) + entropy;
  }
}

function nodeMapper(repo) {
  return { value: 1, label: repo, entropy: rand(repo)(), z: 0 };
}
