var Planet = require('./planet'),
    orbitAllocator = require('./orbit_allocator');

module.exports = System;

function System (scene, subspace) {
  this.scene = scene;
  this.repos = {};
  this.subspace = subspace;

  subspace.on('hail:planet', handleHail.bind(this));
}

System.prototype.form = function (repo) {
  repo.planet = new Planet(this.scene, repo.full_name, repo.language);
  this.repos[repo.full_name] = repo;
};

System.prototype.layout = function () {
  var names = Object.keys(this.repos),
      sortedPlanets = names.map(collectPlanet, this);

  orbitAllocator(names, sortedPlanets);
};

function handleHail (repo, login) {
  this.subspace.emit('hail:ship', login, this.repos[repo].planet);
}

function collectPlanet (name) {
  return this.repos[name].planet;
}
