var Planet = require('./planet'),
    orbitAllocator = require('./orbit_allocator');

module.exports = System;

function System (scene, subspace) {
  this.scene = scene;
  this.planets = [];
  this.names = [];
  this.subspace = subspace;

  subspace.on('hail:planet', handleHail.bind(this));
}

System.prototype.form = function (repo) {
  this.names.push(repo.full_name);
  this.planets[repo.full_name] = new Planet(this.scene, repo);
};

System.prototype.layout = function () {
  var sortedPlanets = this.names.map(collectPlanet, this.planets);
  orbitAllocator(this.names, sortedPlanets);
};

function handleHail (repo, login) {
  this.subspace.emit('hail:ship', login, this.planets[repo]);
}

function collectPlanet (name) {
  return this[name];
}
