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
    shipWorldPosition: function () {
      return { x: 100, y: 200, z: 300 };
    },
    shipPosition: function () {
      return { x: 200, y: 300, z: 400 };
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
    addTorpedo: function (colour, sx, sy, sz, dx, dy, dz) {
      log('Added torpedo with colour 0x' + colour.toString(16) + ' from ' + sx + ', ' + sy + ', ' + sz + ' to ' + dx + ', ' + dy + ', ' + dz);
    },
    extractTorpedo: function (colour, sx, sy, sz, dx, dy, dz) {
      log('Tractored torpedo with colour 0x' + colour.toString(16) + ' from ' + sx + ', ' + sy + ', ' + sz + ' to ' + dx + ', ' + dy + ', ' + dz);
    },
    addWeapons: function (name) {
      log('Added weapons to ' + name);
    },
    hideBeam: function () {
      log('Hidden beam');
    },
    showBeam: function () {
      log('Shown beam');
    }
  };
};
