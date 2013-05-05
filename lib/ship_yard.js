var Ship = require('./ship'),
    queue = require('queue-async');

module.exports = ShipYard;

function ShipYard (scene, subspace) {
  this.scene = scene;
  this.subspace = subspace;
  this.queue = queue(1);
  this.ships = {};
}

ShipYard.prototype.dispatchFleet = function (repo, commits) {
  var yard = this;

  commits.forEach(function (commit) {
    var ship = yard.ships[commit.login];
    yard.queue.defer(function (next) {
      yard.subspace.emit('focus:planet', repo);
      next();
    });
    yard.queue.defer(function (next) {
      yard.dispatch(commit.login, repo, next);
    });
    yard.queue.defer(function (next) {
      yard.attack(commit.login, commit.input, commit.output, next);
    });
  });
};

ShipYard.prototype.commision = function (logins) {
  logins.forEach(buildShip, this);
};

ShipYard.prototype.dispatch = function (login, repo, next) {
  if (!this.ships[login]) {
    buildShip.call(this, login);
  }
  var ship = this.ships[login];
  this.subspace.once('hail:ship', function (planet) {
    ship.orbit(planet, next);
  });
  this.subspace.emit('hail:planet', repo, login);
};

ShipYard.prototype.attack = function (login, input, output, next) {
  this.ships[login].fire(input, output, next);
};

function buildShip (login) {
  if (!this.ships[login]) {
    this.ships[login] = new Ship(this.scene, login);
  }
}
