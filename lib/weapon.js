define(['vendor/three', 'vendor/lodash', 'torpedo', 'animation/bombard'], function (THREE, _, torpedo, bombard) {
  var constructor = function (ship) {
    this.ship = ship;
  };

  constructor.prototype = {
    fire: function (planet, count) {
      var ordnance = _.times(count, torpedo);

      bombard(this.ship, planet, ordnance);
    }
  };

  return constructor;
});
