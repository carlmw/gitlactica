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
    add: add,
    system: system
  };

  function add (colourHex, sx, sy, sz, dx, dy, dz) {
    var position = geo.vertices[i],
        color = geo.colors[i],
        torpedo;

    position.set(sx, sy, sz);
    torpedo = new Torpedo(position, new THREE.Vector3(dx, dy, dz));
    color.setHex(colourHex);
    geo.colorsNeedUpdate = true;
    geo.verticesNeedUpdate = true;
    projectiles.push(torpedo);
    i++;
    if (i > PARTICLE_COUNT - 1) {
      i = 0;
    }
    log('Launched torpedo with colour 0x' + colourHex.toString(16));
    if (!rendering) {
      rendering = true;
      render();
    }
  }

  function update () {
    // Remove detonated torpedoes and advance all remaining torward their targets
    projectiles = _(projectiles).filter(function (projectile) {
      return !projectile.detonated();
    }).invoke('track').value();
    geo.verticesNeedUpdate = true;
  }

  function render () {
    raf(render);
    update();
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
    size: 500,
    map: THREE.ImageUtils.loadTexture('textures/torpedo.png'),
    transparent: true,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });
}
