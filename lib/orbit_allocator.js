var config = require('../config'),
    rand = require('seed-random'),
    d3 = require('d3');

module.exports = OrbitAllocator;

function OrbitAllocator (repos) {
  var r = this.r = repos.length * config.orbitRadius;

  this.repos = repos;
  this.layout = d3.layout.pack()
    .size([r * 2, r * 2]);
}

OrbitAllocator.prototype.allocate = function (planets) {
  var children = this.repos.map(nodeMapper),
      nodes = this.layout.nodes({ children: children }).slice(1);

  planets.map(offsetMapper, this);

  function offsetMapper(planet, i) {
    var node = nodes[i];

    planet.mesh.position.x = node.x - this.r;
    planet.mesh.position.y = node.y - this.r;
  }
};

function nodeMapper (repo) {
  return { value: 1, label: repo, comparitor: rand(repo)() };
}
