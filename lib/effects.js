var _ = require('lodash');

module.exports = {
  addShip: renderHandler('addShip'),
  orbitShip: require('./effects/orbit_ship'),
  fireWeapons: require('./effects/fire_weapons'),
  revealPlanet: require('./effects/reveal_planet'),
  addPlanet: renderHandler('addPlanet'),
  movePlanet: renderHandler('movePlanet'),
  lookAt: renderHandler('lookAt'),
  followShip: require('./effects/follow_ship')(),
  commitDetails: require('./effects/commit_details')
};

function renderHandler (name) {
  return function (animation, renderer) {
    var next = _.last(arguments),
        args = _(arguments).rest(2).without(next).value();

    renderer[name].apply(renderer, args);
    next();
  };
}
