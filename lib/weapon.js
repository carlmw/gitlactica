var _ = require('lodash'),
    torpedo = require('./torpedo'),
    queue = require('queue-async'),
    bombard = require('./animation/bombard'),
    tractorBeam = require('./animation/tractor');

module.exports = Weapon;

function Weapon (ship, scene) {
  this.ship = ship;
  this.scene = scene;
}

Weapon.prototype = {
  fire: function (input, output, planet, next) {
    queue(2)
      .defer(pewpewpew, this.scene, this.ship, planet, input)
      .defer(tractor, this.ship, planet, output)
      .await(next);
  }
};

function pewpewpew(scene, ship, planet, count, next) {
  var ordnance = _.times(count, torpedo);

  bombard(scene, ship, planet, ordnance, next);
}

function tractor(ship, planet, count, next) {
  var ordnance = _.times(count, torpedo);

  tractorBeam(ship, planet, ordnance, next);
}
