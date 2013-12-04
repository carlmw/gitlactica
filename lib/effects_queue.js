var queue = require('queue-async'),
    _ = require('lodash');

module.exports = function (animation, renderer) {
  var q = queue(1),
      effects = {
        addShip: renderHandler('addShip'),
        orbitShip: require('./effects/orbit_ship'),
        fireWeapons: require('./effects/fire_weapons'),
        revealPlanet: require('./effects/reveal_planet'),
        addPlanet: renderHandler('addPlanet'),
        movePlanet: renderHandler('movePlanet'),
        lookAt: renderHandler('lookAt'),
        fadeInPlanetName: require('./effects/fade_in_planet_name')
      };

  return {
    push: function (effect) {
      var args = Array.prototype.slice.call(arguments, 1);
      q.defer.apply(q, [effects[effect], animation, renderer].concat(args));
    }
  };

  function renderHandler (name) {
    return function (animation, renderer) {
      var next = _.last(arguments),
          args = _(arguments).rest(2).without(next).value();

      renderer[name].apply(renderer, args);
      next();
    };
  }
};
