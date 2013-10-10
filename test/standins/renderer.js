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
    destroyShip: function (name) {
      log('Destroyed ship ' + name);
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
    }
  };
};
