var Ship = require('./ship'),
    Torpedo = require('./torpedo');

module.exports = function shipYard (scene, model) {
  var ships = {},
      projectiles = {};

  return {
    addShip: addShip,
    moveShip: moveShip,
    shipPosition: shipPosition,
    destroyShip: destroyShip,
    rotateShip: rotateShip,
    addTorpedo: addTorpedo,
    moveTorpedo: moveTorpedo,
    destroyTorpedo: destroyTorpedo
  };

  function addShip (name) {
    var ship = ships[name] = new Ship(name);
    scene.add(ship.pivot);
    console.log('Added ship ' + name);
  }

  function moveShip (name, x, y, z) {
    ships[name].pivot.position.set(x, y, z);
  }

  function shipPosition (name) {
    return ships[name].position();
  }

  function rotateShip (name, x, y, z) {
    ships[name].pivot.rotation.set(x, y, z);
  }

  function destroyShip (name) {
    var ship = ships[name];
    scene.remove(ship.pivot);
    delete ships[name];
  }

  function addTorpedo (name, id, colour) {
    var torpedo = projectiles[id] = new Torpedo();
    scene.add(torpedo.particle);
  }

  function moveTorpedo (id, x, y, z) {
    projectiles[id].particle.position.set(x, y, z);
  }

  function destroyTorpedo (id) {
    scene.remove(projectiles[id]);
    delete projectiles[id];
  }
};
