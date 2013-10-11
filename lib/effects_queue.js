var queue = require('queue-async'),
    effects = {
      addShip: require('./effects/add_ship'),
      orbitShip: require('./effects/orbit_ship'),
      fireWeapons: require('./effects/fire_weapons')
    };

module.exports = function (animation, renderer) {
  var q = queue(1);

  return {
    push: function (effect) {
      var args = Array.prototype.slice.call(arguments, 1);
      q.defer.apply(q, [effects[effect], animation, renderer].concat(args));
    }
  };
};
