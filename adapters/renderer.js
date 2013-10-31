var scene = require('./scene'),
    shipYard = require('./ship_yard'),
    torpedoLauncher = require('./torpedo_launcher'),
    beam = require('./beam'),
    system = require('./system'),
    camera = require('./camera'),
    _ = require('lodash');

module.exports = function Renderer (config) {
  var stage = scene(config),
      ships = shipYard(stage.scene),
      launcher = torpedoLauncher(stage.scene),
      tractor = torpedoLauncher(stage.scene),
      particleBeam = beam(),
      planets = system(stage.scene),
      cam = camera(stage.camera);

  tractor.system.add(particleBeam);
  hideBeam();

  return _.extend({}, stage, ships, planets, cam, {
    addTorpedo: launcher.add,
    extractTorpedo: tractor.add,
    addWeapons: addWeapons,
    hideBeam: hideBeam,
    showBeam: showBeam
  });

  function addWeapons (name) {
    ships.addObjectToShip(name, tractor.system);
  }

  function hideBeam () {
    particleBeam.visible =  false;
  }

  function showBeam () {
    particleBeam.visible = true;
  }
};
