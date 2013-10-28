var Ship = require('./ship');

module.exports = function shipYard (scene, model) {
  var ships = {};

  return {
    addShip: addShip,
    moveShip: moveShip,
    shipPosition: shipPosition,
    destroyShip: destroyShip,
    rotateShip: rotateShip
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
};
