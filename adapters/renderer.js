var scene = require('./webgl/scene'),
    shipYard = require('./webgl/ship_yard'),
    torpedoLauncher = require('./webgl/torpedo_launcher'),
    beam = require('./webgl/beam'),
    system = require('./webgl/system'),
    camera = require('./webgl/camera'),
    _ = require('lodash');

module.exports = function Renderer (config) {
  var stage = scene(config),
      ships = shipYard(stage.scene),
      launcher = torpedoLauncher(stage.scene),
      tractor = torpedoLauncher(stage.scene),
      particleBeam = beam(),
      planets = system(stage.scene, stage.camera),
      cam = camera(stage.camera);

  stage.scene.add(launcher.system);
  tractor.system.add(particleBeam);
  hideBeam();

  // TODO move launcher and tractor out of renderer
  return _.extend({}, stage, ships, planets, cam, {
    addTorpedo: launcher.add,
    moveTorpedo: launcher.move,
    extractTorpedo: tractor.add,
    moveExtractedTorpedo: tractor.move,
    addWeapons: addWeapons,
    hideBeam: hideBeam,
    showBeam: showBeam,
    document: global.document
  });

  function addWeapons (name) {
    ships.addObjectToShip(name, tractor.system);
    log('Added weapons to ' + name);
  }

  function hideBeam () {
    particleBeam.visible =  false;
    log('Hidden beam');
  }

  function showBeam () {
    particleBeam.visible = true;
    log('Shown beam');
  }
};
