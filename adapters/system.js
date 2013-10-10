var Planet = require('./planet');

module.exports = function system(scene) {
  var planets = {};

  function addPlanet (name, colour) {
    var planet = planets[name] = new Planet(name);
    scene.add(planet.pivot);
  }

  function movePlanet (name, x, y, z) {
    planets[name].pivot.position.set(x, y, z);
  }

  function destroyPlanet (name) {
    var planet = planets[name];
    scene.remove(planet.pivot);
    delete planets[name];
  }

  function scalePlanet (name, factor) {
    planets[name].pivot.scale(factor);
  }
};
