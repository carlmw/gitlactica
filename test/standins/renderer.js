/* global document */
module.exports = function Renderer () {
  log('Started renderer');

  return {
    setSize: function (w, h) { log('Set canvas size ' + w + 'x' + h); },
    render: function () {},
    domCanvas: document.createElement('canvas'),
    addShip: function (name) {
      log('Added ship ' + name);
    },
    moveShip: function (name, x, y, z) {
      log('Moved ship ' + name + ' to ' + x + ', ' + y + ', ' + z);
    },
    shipPosition: function () {
      return { x: 100, y: 200, z: 300 };
    },
    destroyShip: function (name) {
      log('Destroyed ship ' + name);
    },
    rotateShip: function (name, x, y, z) {
      log('Rotated ship ' + name + ' to ' + x + ', ' + y + ', ' + z);
    },
    addPlanet: function (name, colour) {
      log('Added planet ' + name + ' with colour 0x' + colour.toString(16));
    },
    movePlanet: function (name, x, y, z) {
      log('Moved planet ' + name + ' to ' + x + ', ' + y + ', ' + z);
    },
    destroyPlanet: function (name) {
      log('Destroyed planet ' + name);
    },
    scalePlanet: function (name, factor) {
      log('Scaled planet ' + name + ' to ' + factor);
    },
    lookAt: function (x, y, z) {
      log('Looked at ' + x + ', ' + y + ', ' + z);
    },
    addTorpedo: function (name, id, colour) {
      log('Added torpedo for ' + name + ' with id ' + id + ' and colour 0x' + colour.toString(16));
    },
    moveTorpedo: function (id, x, y, z) {
      log('Moved torpedo ' + id + ' to ' + x + ', ' + y + ', ' + z);
    },
    destroyTorpedo: function (id) {
      log('Destroyed torpedo ' + id);
    }
  };
};
