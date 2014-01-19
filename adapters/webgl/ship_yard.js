var Ship = require('./ship');

module.exports = function shipYard (scene) {
  var ships = {};

  return {
    addShip: addShip,
    moveShip: moveShip,
    shipWorldPosition: shipWorldPosition,
    shipChasePosition: shipChasePosition,
    shipPosition: shipPosition,
    destroyShip: destroyShip,
    rotateShip: rotateShip,
    addObjectToShip: addObjectToShip
  };

  function addObjectToShip (name, object) {
    ships[name].pivot.add(object);
  }

  function addShip (name) {
    if (ships[name]) return;
    var ship = ships[name] = new Ship();
    scene.add(ship.pivot);
    log('Added ship ' + name);
  }

  function moveShip (name, x, y, z) {
    ships[name].pivot.position.set(x, y, z);
  }

  function shipPosition (name) {
    return ships[name].mesh.position;
  }

  function shipWorldPosition (name) {
    return ships[name].worldPosition();
  }

  function shipChasePosition (name) {
    return ships[name].chasePosition();
  }

  function rotateShip (name, x, y, z) {
    ships[name].pivot.rotation.set(x, y, z);
  }

  function destroyShip (name) {
    var ship = ships[name];
    scene.remove(ship.pivot);
    delete ships[name];
  }
};
