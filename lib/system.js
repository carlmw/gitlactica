var Planet = require('./planet'),
    orbitAllocator = require('./orbit_allocator');

// TODO tidy repo attributes into a model
module.exports = System;

function System(scene, subspace) {
  this.scene = scene;
  this.repos = {};
  this.subspace = subspace;

  subspace.on('hail:planet', handleHail.bind(this));
  subspace.on('focus:planet', handleShow.bind(this));
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

function handleShow(name) {
  var repo = this.repos[name];

  if (!repo) {
    return;
  }

  this.currentRepo = name;
  this.subspace.emit('show:planet', repo);
}

function cycleTo(diff) {
  var names = Object.keys(this.repos),
    i = names.indexOf(this.currentRepo),
    next = names[i + diff],
    repo = this.repos[next];

  handleShow.call(this, next);
}

function handleNext() {
  cycleTo.call(this, 1);
}

function handlePrevious() {
  cycleTo.call(this, -1);
}
