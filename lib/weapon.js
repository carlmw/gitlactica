var THREE = require('THREE'),
    _ = require('lodash'),
    torpedo = require('./torpedo'),
    bombard = require('./animation/bombard'),
    tractor = require('./animation/tractor');

module.exports = Weapon;

function Weapon (ship, scene) {
  this.ship = ship;
  this.scene = scene;
}

Weapon.prototype = {
  fire: function (planet, count) {
    var ordnance = _.times(count, torpedo);

    bombard(this.scene, this.ship, planet, ordnance);
  },
  tractor: function(planet, count) {
    var ordnance = _.times(count, torpedo);

    tractor(this.ship, planet, ordnance);
  }
};
