var Ship = require('./ship');

module.exports = ShipYard;

function ShipYard (scene, subspace) {
  this.scene = scene;
  this.subspace = subspace;
  this.ships = {};

  this.subspace.on('hail:ship', handleHail.bind(this));
}

ShipYard.prototype.commision = function (logins) {
  logins.forEach(buildShip, this);
};

ShipYard.prototype.dispatch = function (login, repo) {
  this.subspace.emit('hail:planet', repo, login);
};

ShipYard.prototype.attack = function (login, input, output) {};

function buildShip (login) {
  if (!this.ships[login]) {
    this.ships[login] = new Ship(this.scene, login);
  }
}

function handleHail (login, planet) {
  this.ships[login].orbit(planet);
}
