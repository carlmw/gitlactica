var Ship = require('./ship');

module.exports = function shipYard (scene, model) {
  var ships = {};

  return {
    addShip: addShip,
    moveShip: moveShip,
    destroyShip: destroyShip
  }

  function addShip (name) {
    var ship = ships[name] = new Ship(name);
    scene.add(ship.pivot);
  }

  function moveShip (name, x, y, z) {
    ships[name].pivot.position.set(x, y, z);
  }

  function destroyShip (name) {
    var ship = ships[name];
    scene.remove(ship.pivot);
    delete ships[name];
  }
};
