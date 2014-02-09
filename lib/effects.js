var _ = require('lodash');

module.exports = function (subspace) {
  return {
    addShip: renderHandler('addShip'),
    orbitShip: require('./effects/orbit_ship')(),
    fireWeapons: require('./effects/fire_weapons'),
    revealPlanet: require('./effects/reveal_planet'),
    addPlanet: require('./effects/add_planet')(),
    lookAt: renderHandler('lookAt'),
    follow: require('./effects/follow')(),
    commitDetails: require('./effects/commit_details'),
    chase: require('./effects/chase')(),
    repoDetails: require('./effects/repo_details'),
    nextCommit: function () {
      subspace.emit('nextCommit');
    }
  };
};

function renderHandler (name) {
  return function (animation, renderer) {
    var next = _.last(arguments),
        args = _(arguments).rest(2).without(next).value();

    renderer[name].apply(renderer, args);
    next();
  };
}