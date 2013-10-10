var scene = require('./scene'),
    shipYard = require('./ship_yard'),
    system = require('./system'),
    _ = require('lodash');

module.exports = function Renderer (config) {
  var stage = scene(config),
      ships = shipYard(stage.scene, config.ship_model),
      planets = system(stage.scene);

  return _.extend({}, stage, ships, planets);
};
