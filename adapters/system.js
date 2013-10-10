var Planet = require('./planet');

module.exports = function system(scene) {
  var planets = {};

  return {
    addPlanet: addPlanet,
    movePlanet: movePlanet,
    destroyPlanet: destroyPlanet,
    scalePlanet: scalePlanet
  };

  function addPlanet (name, colour) {
    var planet = planets[name] = new Planet(name, colour);
    scene.add(planet.pivot);
    console.log('Added planet ' + name + ' with colour ' + colour);
  }

  function movePlanet (name, x, y, z) {
    planets[name].pivot.position.set(x, y, z);
    console.log('Moved planet ' + name + ' to ' + x + ', ' + y + ', ' + z);
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
