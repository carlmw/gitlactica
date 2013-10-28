var Torpedo = require('./torpedo'),
    _ = require('lodash'),
    raf = require('raf-component'),
    THREE = require('three'),
    PARTICLE_COUNT = 60;

module.exports = function (scene) {
  var system = generateSystem(),
      rendering = false,
      geo = system.geometry,
      i = 0,
      projectiles = [];

  scene.add(system);

  return {
    addTorpedo: addTorpedo,
    updateTorpedoes: updateTorpedoes
  };

  function addTorpedo (colorHex, x, y, z) {
    var position = geo.vertices[i],
        color = geo.colors[i],
        torpedo = new Torpedo(position);

    position.set(x, y, z);
    color.setHex(colorHex);
    geo.colorsNeedUpdate = true;
    geo.verticesNeedUpdate = true;
    projectiles.push(torpedo);
    i++;
    if (i > PARTICLE_COUNT - 1) {
      i = 0;
    }

    if (!rendering) {
      rendering = true;
      render();
    }
  }

  function updateTorpedoes () {
    // Remove detonated torpedoes and advance all remaining torward their targets
    projectiles = _(projectiles).filter(function (projectile) {
      return projectile.unDetonated();
    }).invoke('track').value();
    geo.verticesNeedUpdate = true;
  }

  function render () {
    raf(render);
    updateTorpedoes();
  }
};

function generateSystem () {
  var geo = new THREE.Geometry(),
      material = generateMaterial();

  // Generate a stack of torpedoes for use later
  _.times(PARTICLE_COUNT, function () {
    geo.vertices.push(new THREE.Vector3(0, 0, 0));
    geo.colors.push(new THREE.Color(0xffffff));
  });
  return new THREE.ParticleSystem(geo, material);
}

function generateMaterial () {
  return new THREE.ParticleBasicMaterial({
    size: 600,
    map: THREE.ImageUtils.loadTexture('textures/torpedo.png'),
    transparent: true,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });
}
