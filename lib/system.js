var Planet = require('./planet'),
    orbitAllocator = require('./orbit_allocator');

// TODO tidy repo attributes into a model
module.exports = System;

function System(scene, subspace) {
  this.scene = scene;
  this.repos = {};
  this.subspace = subspace;

  subspace.on('hail:planet', handleHail.bind(this));
  subspace.on('next:planet', handleNext.bind(this));
  subspace.on('previous:planet', handlePrevious.bind(this));
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

System.prototype.reform = function (name, complexity) {
  var scale = Math.log(complexity || 1) / Math.log(1000);

  scale = Math.max(0.2, scale);

  this.repos[name].planet.scale(scale);
};

function handleHail(name, login) {
  this.subspace.emit('hail:ship', login, this.repos[name].planet);
}

function collectPlanet(name) {
  return this.repos[name].planet;
}

function handleShow(diff) {
  var names = Object.keys(this.repos),
    i = names.indexOf(this.currentRepo),
    next = names[i + diff],
    repo = this.repos[next];

  if (!repo) {
    return;
  }

  this.currentRepo = next;
  this.subspace.emit('show:planet', repo.planet);
}

function handleNext() {
  handleShow.call(this, 1);
}

function handlePrevious() {
  handleShow.call(this, -1);
}
