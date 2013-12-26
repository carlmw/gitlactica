var scene = require('./webgl/scene'),
    shipYard = require('./webgl/ship_yard'),
    loader = require('./loader'),
    torpedoLauncher = require('./webgl/torpedo_launcher'),
    textureLoader = require('../lib/texture_loader'),
    texturesToLoad = require('./webgl/textures'),
    beam = require('./webgl/beam'),
    system = require('./webgl/system'),
    camera = require('./webgl/camera'),
    _ = require('lodash');

module.exports = function Renderer (channel) {
  var textures = textureLoader(loader, texturesToLoad, ready, fail),
      stage = scene(textures.skybox, textures.star1, textures.star2, textures.star3),
      ships = shipYard(stage.scene),
      launcher = torpedoLauncher(stage.scene, textures.torpedo),
      tractor = torpedoLauncher(stage.scene, textures.torpedo),
      particleBeam = beam(textures.beam),
      planets = system(stage.scene, stage.camera, textures.planet),
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

  function ready () {
    channel.emit('renderer:ready');
  }

  function fail () {
    channel.emit('failure', 'Failed to load one or more textures');
  }
};
